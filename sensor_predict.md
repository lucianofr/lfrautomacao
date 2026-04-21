## SensorPredict — Soft Sensors Inteligentes para a Indústria de Processos

Nos últimos meses venho desenvolvendo o **SensorPredict**, uma ferramenta desktop open-source para criação e operação de **sensores virtuais (soft sensors)** em tempo real — e o mais interessante: **100% do código foi desenvolvido com auxílio de Inteligência Artificial** (Claude Code / Anthropic).

### O que é?

O SensorPredict conecta-se diretamente ao seu sistema de automação via **OPC-UA**, lê variáveis de processo em tempo real, combina com entradas manuais de laboratório e executa modelos preditivos para estimar variáveis de qualidade que seriam caras ou lentas de medir diretamente.

Em poucas palavras: você treina um modelo, aperta um botão, e passa a ter uma **inferência contínua de qualidade** rodando na sua tela — com alarmes, métricas e gráficos atualizados em tempo real.

### Técnicas de Modelagem

A ferramenta oferece **três abordagens de modelagem** com níveis crescentes de complexidade:

- **PLS (Partial Least Squares)** — o "arroz com feijão" dos soft sensors industriais. Robusto, interpretável, ideal para processos lineares e bem conhecidos.
- **ESN (Echo State Networks)** — redes recorrentes de reservatório para capturar dinâmicas não-lineares e dependências temporais sem o custo computacional de treinar uma rede profunda.
- **LSTM (Long Short-Term Memory)** — deep learning para os casos mais complexos, com memória de longo prazo para processos com dinâmicas lentas.

Todos os modelos contam com **auto-tune de hiperparâmetros** via Optuna com validação cruzada, otimizando diretamente o RMSE em unidades de engenharia.

### Stack Tecnológico

O projeto foi construído sobre bibliotecas consagradas do ecossistema Python:

- **PyQt6** + **PyQtGraph** — interface desktop nativa de alto desempenho com gráficos em tempo real
- **TensorFlow / Keras** — backend para redes LSTM
- **scikit-learn** — PLS e métricas de avaliação
- **bibmon** — biblioteca acadêmica brasileira para monitoramento de processos e ESN
- **asyncua** — comunicação OPC-UA assíncrona (leitura e escrita bidirecional)
- **Optuna** — otimização bayesiana de hiperparâmetros
- **pandas / NumPy** — manipulação e processamento de dados
- **pydantic** — validação de configurações

### Funcionalidades Principais

- Conexão OPC-UA bidirecional (lê variáveis, escreve predições e métricas de volta no servidor)
- Importação de dados de laboratório via Excel
- Pré-processamento configurável (normalização, remoção de outliers, imputação, lag)
- Dashboard de monitoramento com métricas em tempo real (RMSE, R², MAE)
- Gráficos de contribuição SPE por variável para diagnóstico de falhas
- Treinamento online com coleta de dados ao vivo
- Salvar/carregar modelos para reutilização
- Interface em Português (BR) e Inglês
- Design visual Material Design 3

### Para quem é?

Se você é **engenheiro de processos**, **engenheiro químico** ou **engenheiro de controle e automação** e quer implementar soft sensors na sua planta sem depender de licenças caras de software proprietário — esta ferramenta foi feita para você.

### Desenvolvido com IA

Todo o código-fonte — arquitetura hexagonal, adaptadores OPC-UA, modelos preditivos, interface gráfica, testes automatizados — foi desenvolvido em parceria com **Claude Code (Anthropic)**. É um exemplo concreto de como a IA generativa pode acelerar drasticamente o desenvolvimento de ferramentas de engenharia especializadas.

---

#SoftSensor #InferênciaDeQualidade #EngenhariaDeProcessos #ControleDeProcessos #Automação #OPC_UA #MachineLearning #DeepLearning #Python #OpenSource #InteligênciaArtificial #IA #ClaudeCode #Indústria40 #EngenhariaQuímica
