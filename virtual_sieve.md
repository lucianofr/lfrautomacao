# VirtualSieve: Análise Granulométrica Industrial por Visão Computacional

## O problema

Na indústria química, o controle granulométrico de partículas é um fator crítico de qualidade. Processos como a produção de naftaleno exigem monitoramento contínuo do tamanho dos cristais para garantir especificações de produto, otimizar rendimento e evitar paradas não programadas. Tradicionalmente, essa análise depende de peneiramento manual — um processo lento, sujeito a erro humano e que entrega resultados com atraso significativo em relação ao momento da produção.

E se fosse possível obter a distribuição granulométrica em tempo real, de forma automática, sem interromper o processo produtivo?

## A solução: VirtualSieve

O **VirtualSieve** é um sistema completo de análise granulométrica por visão computacional, projetado para ambientes industriais. Ele substitui a peneira física por câmeras posicionadas em pontos estratégicos da linha de produção, analisando continuamente o material e entregando curvas de distribuição granulométrica em tempo real.

O nome diz tudo: uma **peneira virtual**.

## Arquitetura Web moderna e robusta

O sistema foi construído sobre uma arquitetura **Cliente/Servidor** com separação clara de responsabilidades:

- **Backend em Python (FastAPI)** — API REST assíncrona de alto desempenho, com documentação automática via Swagger/OpenAPI.
- **Frontend em Next.js (React)** — interface industrial elegante em dark mode, com dados numéricos em fonte monoespaçada e indicadores visuais de processo (PV, SP, CO) em barras lineares.
- **Banco de dados SQLite em modo WAL** — leve, sem necessidade de servidor de banco de dados externo, ideal para instalações de borda (edge computing) no chão de fábrica.

A arquitetura interna segue os princípios da **Arquitetura Hexagonal (Ports & Adapters)** combinada com **Event-Driven Architecture**. Na prática, isso significa que o sistema possui uma separação rigorosa entre regras de negócio, lógica de aplicação e infraestrutura — facilitando manutenção, testes e evolução do código.

A comunicação em tempo real acontece via **WebSocket**, permitindo que alarmes e resultados cheguem ao operador instantaneamente, sem necessidade de refresh na página.

## Pipeline de visão computacional

O coração do sistema é o pipeline de processamento de imagem, que executa em tempo real para cada câmera:

1. **Captura** — suporte a câmeras USB, IP e streams RTSP
2. **Pré-processamento** — conversão para escala de cinza, filtro Gaussiano, ajuste de brilho e contraste
3. **Segmentação** — dois algoritmos disponíveis:
   - **Clássico** (OpenCV + scikit-image): limiarização adaptativa, operações morfológicas e separação de partículas aglomeradas via Watershed
   - **YOLO** (deep learning): segmentação por rede neural para cenários mais complexos
4. **Medição** — cálculo de área, diâmetro equivalente e classificação em faixas granulométricas (sieve ranges) configuráveis
5. **Filtragem** — exclusão automática de partículas que tocam as bordas da imagem e seleção de Região de Interesse (ROI)

Todo o processamento roda em **CPU**, sem necessidade de GPU dedicada, viabilizando instalações em hardware compacto diretamente no chão de fábrica.

## Suporte multi-câmera com isolamento total

Uma das características mais poderosas do VirtualSieve é a capacidade de monitorar **múltiplas câmeras simultaneamente**, cada uma associada a uma linha de produção diferente. O sistema implementa o padrão **Produtor-Consumidor** com threads isoladas por câmera:

- Uma thread dedicada à captura de frames
- Uma thread dedicada ao processamento de visão computacional
- Uma fila global para gravação assíncrona dos resultados

Isso garante que o processamento de uma câmera nunca interfira no de outra, mesmo sob carga elevada.

## Calibração intuitiva

A calibração é simples e visual: o operador seleciona a câmera, captura uma imagem de referência (ou faz upload de uma imagem de teste) e traça uma linha sobre uma distância conhecida para definir a relação **mm/pixel**. A partir daí, todas as medições daquela câmera são automaticamente convertidas para unidades reais.

Nessa mesma tela, o operador configura:
- O algoritmo de segmentação (Clássico ou YOLO)
- Os parâmetros de processamento (threshold, blur, operações morfológicas)
- A Região de Interesse (ROI), desenhando diretamente sobre a imagem

Tudo com feedback visual em tempo real — o operador vê o efeito de cada ajuste antes de salvar.

## Alarmes e rastreabilidade

O sistema monitora continuamente os resultados e dispara alarmes quando os limites configurados são ultrapassados. Cada alarme:
- Salva automaticamente a imagem que gerou o desvio
- Registra timestamp, câmera, operador e parâmetros ativos
- É exibido em tempo real via WebSocket no dashboard

Um audit log completo rastreia todas as ações do sistema — logins, alterações de configuração, criação de usuários — com retenção configurável.

## Segurança industrial

- **Autenticação JWT** com cookies HttpOnly (tokens nunca expostos no corpo da resposta)
- **RBAC** com dois perfis: administrador (acesso total) e operador (visualização e operação)
- **Hash de senhas com Argon2** (padrão-ouro atual)
- **Validação rigorosa de uploads** por magic bytes (não por content-type, que é facilmente forjável)
- **Proteção contra path traversal** no armazenamento de imagens

## Customização para diferentes materiais

Embora desenvolvido originalmente para cristais de naftaleno, o VirtualSieve foi projetado com flexibilidade:

- **Faixas granulométricas (sieve ranges) totalmente configuráveis** — defina as faixas de tamanho relevantes para o seu material (cimento, sal, açúcar, fertilizantes, polímeros, etc.)
- **Parâmetros de processamento ajustáveis por câmera** — cada câmera pode ter configurações independentes de threshold, blur, contraste e brilho, adaptadas às características visuais do material
- **Escolha de algoritmo por câmera** — segmentação clássica para materiais bem definidos, YOLO para cenários com partículas irregulares ou fundo complexo
- **ROI configurável** — isole apenas a região da imagem relevante para a análise
- **Limites de alarme individuais por câmera** — cada linha de produção pode ter seus próprios critérios de aceitação

Essa flexibilidade permite que o mesmo sistema seja implantado em diferentes contextos industriais com mínimo esforço de adaptação.

## Stack tecnológica completa

| Camada | Tecnologia |
|--------|-----------|
| Backend | Python 3.12+, FastAPI |
| Frontend | Next.js (React) |
| Banco de dados | SQLite (WAL) + SQLAlchemy 2.x async |
| Visão computacional | OpenCV, scikit-image, SciPy, NumPy |
| Deep learning | YOLO (segmentação) |
| Autenticação | Argon2 + PyJWT + Auth.js |
| Comunicação real-time | WebSocket |
| Testes | pytest + pytest-asyncio (255 testes, 92% cobertura) |
| Qualidade | ruff (lint/format), mypy --strict |
| Migrations | Alembic |

## Resultados

O projeto conta com **255 testes automatizados** (unitários, integração e E2E) com **92% de cobertura de código**, validados por type checking estrito com mypy. A arquitetura hexagonal garante que cada camada pode ser testada isoladamente, e o pipeline de visão computacional pode ser validado com imagens de teste sem necessidade de câmera física.

---

O VirtualSieve demonstra como visão computacional, arquitetura de software bem projetada e boas práticas de engenharia podem transformar um processo industrial manual em uma solução automatizada, precisa e em tempo real.

Se você trabalha com controle de qualidade em processos industriais que envolvem materiais particulados, este tipo de abordagem pode ser o diferencial entre reagir a problemas e preveni-los.

---

*#visaocomputacional #industria40 #python #fastapi #nextjs #opencv #qualidadeindustrial #granulometria #automacaoindustrial #computervision #deeplearning #engenhariasoftware*
