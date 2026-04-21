---
title: "SafeGuard — Visão Computacional e CLPs Protegendo o Chão de Fábrica"
descricao: "Sistema de segurança industrial que une YOLO, comunicação industrial (Modbus/OPC UA) e dashboard em tempo real para prevenir acidentes em ambientes de alto risco."
autor: SafeGuard Team
data: 2026-04-21
tags: [seguranca-industrial, visao-computacional, iiot, yolo, opcua, modbus, python]
---

# SafeGuard: quando a IA desliga a máquina antes do acidente acontecer

> **Parada de emergência automática, sem depender do reflexo humano.**

Todo ano, milhares de acidentes em plantas industriais acontecem no mesmo padrão: um operador entra em uma zona de risco em **um segundo**, e o tempo de reação humana — próprio ou de um colega — simplesmente não é suficiente. Sensores físicos (cortinas de luz, tapetes de pressão) ajudam, mas cobrem áreas limitadas, são caros de reconfigurar e **não entendem o contexto** da cena.

O **SafeGuard** ataca esse problema combinando **visão computacional moderna** com **comunicação industrial nativa**: uma câmera IP já existente vira um sensor inteligente que, em milissegundos, manda o CLP parar a máquina e acionar a sirene.

---

## O que o SafeGuard resolve

| Problema do chão de fábrica | Como o SafeGuard resolve |
|-----------------------------|--------------------------|
| Invasão de zona perigosa por operador, visitante ou empilhadeira | Detecção por classe (**pessoa, carro, caminhão**) + análise de polígonos de risco |
| Operação sem EPI (capacete, colete, luvas, óculos, etc.) | Modo **PPE Absence** detecta ausência de equipamento obrigatório |
| Princípio de incêndio não percebido a tempo | Pipeline paralelo de **detecção de fogo e fumaça** (YOLOv26-S) |
| Reação humana lenta para parar a máquina | Envio direto ao CLP via **Modbus TCP** ou **OPC UA** em tempo real |
| Falta de rastreabilidade pós-incidente | **Screenshots + histórico SQLite** de cada evento com timestamp e zona |
| Integração frágil com SCADA/HMI/MES | SafeGuard pode **atuar como servidor OPC UA** exportando variáveis padronizadas |

---

## Stack tecnológica

### Visão Computacional
- **[Ultralytics YOLO](https://github.com/ultralytics/ultralytics)** (YOLO11/YOLO26) — detecção de pessoas, veículos e EPIs
- **YOLOv26-S fire/smoke** — modelo dedicado baixado do **HuggingFace Hub** para detecção de fogo e fumaça
- **[supervision](https://github.com/roboflow/supervision)** — processamento de detecções e bounding boxes
- **OpenCV** + **PyAV** — captura RTSP/USB com decodificação acelerada

### Comunicação Industrial (IIoT)
- **[pymodbus](https://github.com/pymodbus-dev/pymodbus)** — cliente **Modbus TCP** para CLPs Siemens, Schneider, Allen-Bradley, WEG, Delta, Mitsubishi, etc.
- **[asyncua](https://github.com/FreeOpcUa/opcua-asyncio)** — **OPC UA** em dois modos:
  - **Cliente** conectando em servidores externos (SCADA/HMI existente)
  - **Servidor** próprio, expondo variáveis para SCADA/HMI/MES lerem e assinarem

### Backend
- **Python 3.11+** — `StrEnum`, type hints modernos, pattern matching
- **[FastAPI](https://fastapi.tiangolo.com/)** + **Uvicorn** — API REST + WebSocket
- **asyncio / TaskGroup** — pipeline 100% assíncrono
- **[Pydantic v2](https://docs.pydantic.dev/)** + **Pydantic Settings** — validação e configuração
- **[structlog](https://www.structlog.org/)** — logging estruturado
- **[aiosqlite](https://github.com/omnilib/aiosqlite)** — persistência assíncrona de eventos
- **JWT + bcrypt** (python-jose / passlib) — autenticação

### Frontend
- **HTML/CSS/JS vanilla** com tema industrial escuro
- **Stream MJPEG** com overlay de zonas e detecções
- **WebSocket** para eventos em tempo real (alarme, shutdown, fogo/fumaça)

### Qualidade
- **pytest** + **pytest-asyncio** — 167 testes cobrindo domínio, pipeline e integrações
- **Ruff** (lint + format) e **MyPy strict** — código tipado e consistente
- **Arquitetura Hexagonal (Ports & Adapters)** + **Event-Driven**

---

## Arquitetura em uma imagem

```
   ┌────────────┐   ┌─────────────────┐   ┌──────────────────┐
   │  Câmera    │──▶│  YOLO Detector  │──▶│ Frame Processor  │
   │ RTSP/USB   │   │ (person/vehicle │   │  (histerese)     │
   └────────────┘   │  + PPE + fire)  │   └────────┬─────────┘
                    └─────────────────┘            │
                                                   ▼
                                          ┌────────────────┐
                                          │  Zone Analyzer │
                                          │ (polígonos)    │
                                          └────────┬───────┘
                                                   │
                                          ┌────────▼────────┐
                                          │   Event Bus     │
                                          │  (pub/sub async)│
                                          └─┬──────────┬────┘
                           ┌────────────────┘          └────────────────┐
                           ▼                                            ▼
                ┌─────────────────────┐                    ┌────────────────────┐
                │   Safety Engine     │                    │   Dashboard Web    │
                │ (alarme + shutdown) │                    │ FastAPI + WS       │
                └──────────┬──────────┘                    └────────────────────┘
                           │
                 ┌─────────┴──────────┐
                 ▼                    ▼
           ┌──────────┐        ┌──────────────┐
           │ Modbus   │        │  OPC UA      │
           │  TCP     │        │ cliente/serv │
           └──────────┘        └──────────────┘
                 │                    │
                 └─────────┬──────────┘
                           ▼
                     ┌─────────┐
                     │   CLP   │  ← sirene, luzes, parada de emergência
                     └─────────┘
```

---

## Funcionalidades em destaque

### Detecção por classe com sinais PLC dedicados
Cada classe (pessoa, carro, caminhão) **e cada tipo de EPI ausente** tem seu próprio registrador Modbus / node OPC UA. O CLP pode implementar lógica diferenciada: *“pessoa para a prensa, caminhão só aciona alerta visual”*.

- Registradores Modbus **20–22** → presença por classe
- Registradores **30–33** → EPI ausente por tipo
- Nodes OPC UA seguem o padrão `ns=2;s=SafeGuard.Presence.Person`, `ns=2;s=SafeGuard.PPE.NoHelmet`, etc.

### Troca de modo de detecção em runtime
Via `PUT /api/detection/config` é possível alternar entre **presence_detection** e **ppe_absence** **sem reiniciar o pipeline**. Modelos de EPI são opcionais — o sistema continua funcional mesmo sem o modelo customizado carregado.

### Histerese configurável para ambientes industriais
- **Presence:** 5 frames para ativar / 5 para limpar
- **PPE:** 5 / 8 (mais conservador)
- **Fire/Smoke:** 3 / 10 (confiança default 0.5 para reduzir falso positivo)

Evita flickering causado por oclusões parciais, iluminação inconsistente ou poeira — problemas comuns em galpões reais.

### Zonas de risco dinâmicas
- Polígonos definidos em **coordenadas normalizadas (0–1)** → independência de resolução da câmera
- **Hot reload via API** (`PUT /api/zones/{id}`) — sem downtime
- Cada zona mapeia para **uma ou mais `machine_ids`** — só as máquinas daquela área param

### Evidências automáticas
- **Screenshot** no momento exato do evento
- **SQLite** com histórico filtrado por câmera, zona, classe, período
- **WebSocket** empurra eventos para qualquer dashboard/supervisório conectado

---

## Desafios técnicos enfrentados

**1. Latência fim-a-fim sob controle.**
Entre frame capturado e coil escrito no CLP, o objetivo é ficar abaixo de 300 ms. Isso exigiu pipeline 100% async, `run_in_executor` para chamadas bloqueantes da YOLO, e **event bus** desacoplado para que persistência e UI nunca atrasem o caminho crítico do shutdown.

**2. Robustez contra falso positivo.**
Um shutdown indevido em produção contínua custa caro. A combinação de **histerese por classe**, **filtro de confiança**, **polígonos de zona** e **debounce no set-empty** reduz drasticamente disparos espúrios sem sacrificar sensibilidade.

**3. Integração com parque heterogêneo de CLPs.**
Cada planta tem um CLP diferente. A **arquitetura hexagonal** permite que `PLCPort` seja implementada por Modbus TCP, OPC UA cliente ou OPC UA servidor — **o núcleo do domínio nem sabe qual está em uso**.

**4. Streams MJPEG autenticados.**
A tag `<img>` do HTML não envia headers customizados. Solução: **JWT passado via query parameter** com validação no endpoint de stream, mantendo o dashboard seguro sem quebrar o padrão do navegador.

**5. Execução em edge.**
YOLO26n e YOLO11n foram escolhidos como defaults por serem leves o suficiente para rodar em **mini PCs industriais e Jetson Nano/Orin**, sem depender de nuvem.

---

## Casos de uso

### Linha de produção automatizada
Prensas, robôs colaborativos, braços de solda. SafeGuard detecta operador cruzando o perímetro e aciona `ESTOP` no CLP antes que o corpo entre na área de risco.

### Canteiro de obras / mineração
Detecção de **capacete, colete, luvas, óculos e botas de segurança** em tempo real. Se faltar EPI, o acesso à área ou à máquina é bloqueado automaticamente.

### Docas de carregamento e pátios logísticos
Distinção entre **pessoa, carro e caminhão** para diferenciar ações: veículo autorizado apenas alerta, pessoa a pé dispara parada.

### Armazéns com empilhadeiras
Zonas pedestres x zonas de tráfego. Invasão cruzada aciona sirene local e registra evidência.

### Subestações e salas elétricas
Presença não autorizada fora de janela de manutenção → alarme + notificação.

### Galpões com risco de incêndio
Detector de **fogo e fumaça** global (sem zona) dispara sinalização PLC dedicada e banner no dashboard para evacuação e acionamento de brigada.

### Integração com SCADA/HMI/MES existente
Modo **servidor OPC UA** expõe variáveis padronizadas (`SafeGuard.Presence.*`, `SafeGuard.Fire`, `SafeGuard.Smoke`, `SafeGuard.PPE.No*`) para que sistemas corporativos leiam e registrem ocorrências sem integração customizada.

---

## Benefícios para o negócio

- **Reduz risco de acidentes** com humanos e equipamentos em zonas críticas
- **Aproveita câmeras já instaladas** — investimento incremental, não greenfield
- **Integra-se ao parque de CLPs existente** (Modbus TCP / OPC UA são universais)
- **Rastreabilidade completa** para auditorias, NR-12, ISO 45001 e seguradoras
- **Opera em edge** — sem dependência de nuvem nem latência de rede externa
- **Open architecture** — hexagonal, testada e extensível (novas câmeras, novos CLPs, novos detectores são plugáveis via `Protocol`)
- **Dashboard pronto** com autenticação, streams ao vivo e histórico

---

## Próximos passos no roadmap

- Reconexão automática de câmeras e CLPs com backoff exponencial
- Docker + systemd para deploy padronizado
- Rate limiting nos endpoints REST
- Rotação automática de screenshots antigos
- Endpoint periódico de health-check (`SystemHealthStatus`) para observabilidade
- Overlay server-side de bboxes de fogo/fumaça no stream MJPEG

---

## Conclusão

SafeGuard mostra que **IA de ponta e automação industrial clássica** não são mundos separados. Ao tratar a câmera como **mais um sensor do CLP**, a planta ganha uma camada de proteção inteligente, contextual e auditável — sem abandonar os padrões (Modbus, OPC UA) que o chão de fábrica já entende.

**Visão computacional que não só vê o risco — ela age.**

---

*SafeGuard é um projeto em Python 3.11+, licença a definir. Código-fonte, documentação técnica e guia de implantação disponíveis no repositório oficial.*
