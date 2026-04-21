# Smart PID Edge Platform: Inteligência Artificial Otimizando Malhas de Controle Industrial em Tempo Real

**Imagine um engenheiro de controle que nunca dorme, nunca se distrai e ajusta suas malhas PID continuamente — 24 horas por dia, 7 dias por semana.** Esse é o Smart PID Edge Platform.

---

## O Problema que Ninguém Fala

Na indústria de processos — petroquímicas, mineração, papel e celulose, saneamento — estima-se que **mais de 60% das malhas de controle PID operam com sintonia subótima**. O resultado? Consumo excessivo de energia, desperdício de matéria-prima, instabilidade operacional e desgaste prematuro de atuadores.

A sintonia manual de PIDs é um trabalho artesanal: depende de profissionais experientes, consome horas de testes em campo e, frequentemente, é "feita uma vez e esquecida". Quando as condições do processo mudam — e elas sempre mudam — a malha volta a operar fora do ideal.

**E se existisse uma ferramenta que fizesse isso automaticamente, de forma contínua e inteligente?**

---

## Apresentando o Smart PID Edge Platform

O **Smart PID Edge Platform** é um sistema open-source de otimização de malhas PID industriais que combina **Lógica Fuzzy**, **Aprendizado por Reforço (RL)** e uma arquitetura de software de nível enterprise para entregar self-tuning autônomo em tempo real.

A plataforma opera como um **Edge Optimizer**: um daemon headless que roda em um PC industrial ao lado do CLP, conectando-se via **OPC-UA** para ler variáveis de processo e escrever ajustes de sintonia diretamente no controlador — tudo com guardrails de segurança configuráveis.

---

## Arquitetura: Robustez Industrial de Verdade

A decisão arquitetural mais importante do projeto foi **não ser monolítico**. O Smart PID adota uma arquitetura **Hexagonal (Ports & Adapters) + Event-Driven**, dividida em dois módulos completamente independentes:

### Backend (Core Engine) — O Cérebro
- Daemon headless projetado para rodar como serviço `systemd` em Linux industrial
- Responsável por **toda** a lógica crítica: PID, IA, alarmes, persistência
- Comunicação com CLPs via **OPC-UA** assíncrono (`asyncua`)
- Banco de dados **SQLite em modo WAL** — escrita concorrente sem locks, ideal para edge computing
- API REST via **FastAPI** para comandos e consulta de histórico
- Barramento de eventos interno via **ZeroMQ** (`inproc://`) com proxy XPUB/XSUB

### Frontend (HMI Desktop) — Os Olhos
- Aplicação desktop construída com **PySide6** (Qt for Python, licença LGPL)
- Interface Dark Room projetada segundo normas **ISA-101** para salas de controle
- Gráficos de tendência em tempo real via **pyqtgraph** (30-60 FPS)
- Cliente puro de rede — **zero acesso direto a hardware ou banco de dados**
- Telemetria em tempo real via **ZeroMQ** TCP PUB/SUB (latência de milissegundos)

### Comunicação Dual-Channel
A separação em dois canais de comunicação é intencional e reflete requisitos industriais reais:

| Canal | Tecnologia | Propósito | Latência |
|-------|-----------|-----------|----------|
| Tempo Real | ZeroMQ PUB/SUB (TCP) | Telemetria, alarmes, status | < 10 ms |
| Comando/Histórico | FastAPI REST (HTTP) | Setpoint, config, trends | < 100 ms |

Essa arquitetura garante que **a perda do HMI nunca afeta o controle**. O Backend continua operando autonomamente mesmo sem interface gráfica conectada.

---

## Stack Tecnológica Completa

O projeto é um **monorepo Python 3.13** gerenciado com **uv workspaces** (hatchling), dividido em 3 pacotes com dependências estritamente unidirecionais:

```
smart_pid_domain  →  Modelos, enums, eventos (ZERO dependências de infra)
smart_pid_core    →  Backend daemon (depende apenas do domain)
smart_pid_hmi     →  Cliente desktop (depende apenas do domain)
```

### Bibliotecas-Chave

| Camada | Bibliotecas |
|--------|------------|
| **Controle PID** | Implementação própria (velocity form), numpy, scipy |
| **IA — Fuzzy** | scikit-fuzzy (7 níveis linguísticos, 3 matrizes de regras) |
| **IA — RL** | stable-baselines3 (SAC/PPO), treinamento online contínuo |
| **Comunicação** | pyzmq (msgpack), FastAPI, httpx, asyncua (OPC-UA) |
| **Interface** | PySide6, pyqtgraph |
| **Persistência** | aiosqlite (SQLite WAL mode) |
| **Auth** | PyJWT + bcrypt |
| **Validação** | pydantic v2, pydantic-settings |
| **Qualidade** | ruff (lint), mypy strict, pytest + pytest-asyncio |

---

## Inteligência Artificial: Não é Buzzword, é Matemática

O sistema oferece **3 estratégias de otimização por malha**, selecionáveis independentemente:

### 1. NONE — Sem IA
O PID opera com sintonia fixa. Ideal para malhas já bem sintonizadas ou durante comissionamento.

### 2. FUZZY — Lógica Fuzzy (Zero-Touch)
Motor de inferência com **7 conjuntos fuzzy** (NB, NM, NS, ZO, PS, PM, PB), funções de pertinência triangulares/trapezoidais com 50% de overlap, e defuzzificação por Centro de Gravidade (CoG).

A saída γ ∈ [-1.0, +1.0] modula o ganho integral:

```
Ki_novo = Ki_atual × (1 + γ × Sv)
```

Onde **Sv** (Speed Factor) adapta a agressividade ao tipo de processo:
- **Vazão** (rápido): Sv = 0.05 — ajustes microscópicos de 5%
- **Pressão** (médio): Sv = 0.15 — ajustes moderados de 15%
- **Temperatura** (lento): Sv = 0.30 — correções agressivas de 30%

### 3. RL — Reinforcement Learning (SAC/PPO)
Agente de aprendizado por reforço com observação `[error, Δerror, CO, integral_val]` e mesma interface de saída γ do Fuzzy — tornando a troca entre métodos transparente.

### 3 Objetivos de Controle
Cada malha seleciona seu comportamento desejado:

- **SP Tracking**: Minimiza tempo de resposta a mudanças de setpoint, penaliza overshoot
- **Disturbance Rejection**: Elimina offset rapidamente, agressivo próximo ao erro zero
- **Surge Level**: Permite flutuação livre do nível, atua apenas nos extremos — ideal para vasos pulmão

---

## Motor PID: Implementação Industrial

O PID utiliza a **forma velocidade (incremental)**, padrão em sistemas de controle distribuído (DCS/SDCD):

```
Δcv = Kp × [(e - e₁) + (dt/Ti)×e - Td×(pv - 2×pv₁ + pv₂)/dt]
```

Recursos que vão além do PID acadêmico:
- **Anti-windup** com limites ARW separados + recuperação 16x
- **Bumpless transfer** entre modos (Manual → Auto sem bump)
- **Rampa de setpoint** (SP ramp) para transições suaves
- **Filtro derivativo** para rejeição de ruído
- **Integral deadband** para evitar hunting próximo ao setpoint
- **8 modos de operação**: OOS, IMan, LO, Man, Auto, Cas, RCas, ROut

---

## Casos de Uso Reais

### Caso 1: Refinaria — Otimização de Malhas de Temperatura
Uma unidade de destilação com 40+ malhas de temperatura sofre com oscilações sazonais. O Smart PID, operando em modo **Supervisório**, monitora cada malha via OPC-UA e ajusta continuamente o Ti no CLP existente usando Fuzzy com objetivo **Disturbance Rejection** e Sv = 0.30 (processo lento). Resultado esperado: redução de variabilidade e consumo energético.

### Caso 2: Mineração — Controle de Nível de Vasos Pulmão
Tanques intermediários em circuitos de flotação precisam absorver variações de vazão sem perturbar a válvula. O objetivo **Surge Level** cria uma "banda morta virtual" — a IA ignora pequenos desvios e só atua quando o nível ameaça os extremos, prolongando a vida útil das válvulas de controle.

### Caso 3: Papel e Celulose — Malhas de Vazão Rápida
Controladores de vazão com scan rates de 100ms exigem ajustes mínimos e cautelosos. Com Sv = 0.05 e modo **SP Tracking**, o Fuzzy faz micro-ajustes de 5% no Ki a cada ciclo, evitando overshoot em processos com dinâmica rápida.

### Caso 4: Saneamento — Monitoramento e Análise de Performance
Mesmo sem IA ativa (modo NONE), a plataforma funciona como **historiador e analisador de performance**. Métricas como IAE, ITAE, ISE, MSE, desvio padrão e Total Variation (TV) são calculadas por malha, permitindo identificar controladores problemáticos antes que causem impacto operacional.

### Caso 5: Comissionamento — Digital Twin para Validação
O simulador integrado (scipy.signal + python-control) permite testar estratégias de controle em modelos de função de transferência antes de conectar ao processo real. O engenheiro valida a sintonia em ambiente seguro, depois faz deploy para produção com um clique.

---

## Multiplataforma e Deployment Flexível

| Cenário | Backend | HMI | Comunicação |
|---------|---------|-----|-------------|
| **Edge completo** | PC Industrial (Linux) | Mesmo PC ou estação remota | localhost ou LAN |
| **Sala de controle** | Servidor dedicado | Múltiplas estações de operação | LAN/VLAN industrial |
| **Laboratório/Teste** | Laptop do engenheiro | Mesmo laptop | localhost |
| **Cloud-Edge híbrido** | VM/Container na borda | Desktop remoto via VPN | WAN segura |

O Backend roda como **daemon systemd** em qualquer Linux. O HMI é uma aplicação desktop PySide6 que conecta via IP — nenhuma configuração especial de rede é necessária além de TCP/IP padrão.

---

## Design de Interface: ISA-101 Meets Dark Room

A interface segue dois padrões complementares:

- **ISA-101 (HMI Design)**: Hierarquia de navegação em níveis (Overview → Detail → Faceplate), uso semântico de cores apenas para alarmes
- **Dark Room**: Fundo preto absoluto (#000000), emissão mínima de luz, tipografia monoespaçada — projetado para operadores em turnos de 12 horas em salas de controle escurecidas

Os cards de controlador utilizam **barras analógicas contínuas** (sem sparklines) para PV, SP e CO — fiéis à tradição de instrumentação industrial, mas com a precisão de um display digital.

---

## Qualidade de Código: Padrão Enterprise

O projeto adota práticas rigorosas de engenharia de software:

- **TDD**: Testes escritos antes da implementação (73+ testes unitários e de integração)
- **Arquitetura Hexagonal**: Domain nunca importa de adapters — isolamento total
- **Type Safety**: mypy em modo strict, pydantic v2 para validação em runtime
- **Linting**: ruff com line-length=100
- **Eventos Imutáveis**: Frozen dataclasses para todo o barramento de eventos
- **Injeção de Dependência**: Protocol classes (sem ABC) para todos os ports

---

## Roadmap

| Fase | Status | Escopo |
|------|--------|--------|
| Phase 1 — Foundation + Domain + PID | ✅ Concluída | Modelos, enums, PID engine, mode manager |
| Phase 2 — REST API + Auth + Telemetry | ✅ Concluída | FastAPI, JWT, ZeroMQ publisher |
| Phase 3a — HMI Desktop | ✅ Concluída | PySide6, Dark Room theme, cards, trends |
| Phase 4 — Simulator (Digital Twin) | 🔄 Em desenvolvimento | Backend + UI básica |
| Phase 5 — AI (Fuzzy + RL) + Statistics | 📋 Planejada | Motor de inferência, métricas |
| Phase 6 — Alarms + RBAC | 📋 Planejada | Sistema de alarmes, controle de acesso |
| Phase 7 — Executive Dashboard + Export | 📋 Planejada | Multi-trend, PDF/Excel, temas |

---

## Para Quem é Esta Ferramenta?

- **Engenheiros de Controle e Automação** que querem otimizar malhas sem depender de soluções proprietárias caríssimas
- **Integradores de Sistemas** buscando uma plataforma extensível para projetos de otimização
- **Pesquisadores e Estudantes** de controle de processos e IA aplicada à indústria
- **Plantas industriais** que querem extrair mais performance de seus CLPs e DCSs existentes, sem substituí-los

---

## Conclusão

O Smart PID Edge Platform não é apenas mais um projeto acadêmico de controle PID. É uma **plataforma industrial real**, construída com arquitetura de software moderna, padrões de qualidade enterprise e conhecimento profundo de automação de processos.

A combinação de **Lógica Fuzzy + Reinforcement Learning + PID velocity form + OPC-UA + arquitetura hexagonal** em uma única plataforma open-source é, até onde sabemos, **inédita no mercado**.

Se você trabalha com automação industrial e quer levar suas malhas de controle para o próximo nível — ou se é um desenvolvedor interessado em IA aplicada à indústria — acompanhe o projeto e contribua.

**O futuro do controle de processos é autônomo, inteligente e open-source.**

---

*#AutomaçãoIndustrial #PID #InteligênciaArtificial #FuzzyLogic #ReinforcementLearning #Python #OpenSource #EdgeComputing #OPCUA #Indústria40 #ControleDeProcessos #SCADA #IoT #EngenhariaDeControle*
