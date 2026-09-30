import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Thermometer, Box, Cable, Timer, FileSpreadsheet, ShieldCheck, Send, GitCompare } from 'lucide-react';
import styles from '../solucao.module.css';

const spaced = { marginTop: '2rem', marginBottom: '2rem' };

export default function TermoCarPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={`heading-xl ${styles.heroTitle}`}>
              Termo<span className="text-gradient-amber">Car</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Telemetria térmica de carros de grelha em fornos de pelotização e sinterização, com mapa 3D de temperatura por posição no forno e integração OPC-UA, datalogger e PIMS.
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={`container ${styles.grid}`}>
            <article className={styles.article}>
              <blockquote>
                Cada ciclo de queima vira uma superfície térmica: 16 termopares no leito do carro, cruzados com a posição calculada no forno, em uma única plataforma web.
              </blockquote>

              <img
                src="/images/termocar-carro-grelha.jpg"
                alt="Carro de grelha com datalogger e termopares instalados"
                className={styles.screenshot}
              />

              <h2>Enxergar o que acontece dentro do forno</h2>
              <p>
                Em fornos de pelotização e sinterização, a temperatura no leito do carro de grelha define a qualidade do produto, mas ela só é conhecida em pontos isolados e depois do fato. O <strong>TermoCar</strong> acompanha o carro ao longo do forno com um datalogger a bordo e reconstrói o perfil térmico completo de cada passagem.
              </p>
              <ul>
                <li><strong>Aquisição a 1 Hz:</strong> 16 termopares e a carga da bateria do datalogger, com timestamps retroativos tratados quando o rádio transmite em rajadas.</li>
                <li><strong>Posição por integração:</strong> a posição do carro é calculada pela velocidade do processo, a partir do pulso de início de ciclo lido do DCS/PLC.</li>
                <li><strong>Alinhamento temporal:</strong> temperatura e posição são cruzadas em bins de 1 segundo, mesmo vindo de relógios diferentes.</li>
              </ul>

              <img
                src="/images/termocar-dashboard.png"
                alt="Dashboard em tempo real com 16 termopares, bateria e tendência"
                className={styles.screenshot}
                style={spaced}
              />

              <h2>Monitoramento em Tempo Real</h2>
              <p>
                O dashboard mostra o último valor válido de cada termopar, o nível de bateria do datalogger e a tendência em janela móvel. Leituras antigas ou fora de faixa mudam de estado visual, deixando claro quando há perda de rádio ou sensor com problema.
              </p>
              <ul>
                <li><strong>Cards por canal:</strong> temperatura máxima, média, bateria e estado do ciclo ativo.</li>
                <li><strong>Gráfico de tendência:</strong> janela configurável, com seleção individual de cada termopar.</li>
                <li><strong>Multi-forno e multi-carro:</strong> cadastro de fornos, carros, alocações e mapeamento de sensores e canais.</li>
              </ul>

              <img
                src="/images/termocar-surface3d.png"
                alt="Superfície 3D de temperatura por posição no carro e distância no forno"
                className={styles.screenshot}
                style={spaced}
              />

              <h2>Mapa Térmico 3D por Ciclo</h2>
              <p>
                Ao selecionar um ciclo, o sistema renderiza uma superfície onde o eixo X é a posição transversal no carro, o eixo Y é a distância percorrida no forno e a cor e altura representam a temperatura. Zonas quentes, frias e assimetrias entre lados do carro ficam visíveis de imediato.
              </p>

              <img
                src="/images/termocar-cycles.png"
                alt="Lista de ciclos registrados com filtros"
                className={styles.screenshot}
                style={spaced}
              />

              <h2>Ciclos, Comparação e Estatísticas por Zona</h2>
              <ul>
                <li><strong>Histórico de ciclos:</strong> todo ciclo detectado pelo pulso de início fica registrado com início, fim e KPIs.</li>
                <li><strong>Comparação de ciclos:</strong> sobreponha passagens diferentes para avaliar deriva de processo ou efeito de ajustes.</li>
                <li><strong>Estatísticas por zona:</strong> máximo, mínimo e média por zona do forno, com filtro por período.</li>
              </ul>

              <img
                src="/images/termocar-compare.png"
                alt="Comparação entre ciclos"
                className={styles.screenshot}
                style={spaced}
              />

              <img
                src="/images/termocar-zone-stats.jpeg"
                alt="Estatísticas por zona do forno"
                className={styles.screenshot}
                style={spaced}
              />

              <h2>Relatórios e Exportação</h2>
              <p>
                Seleção de intervalo de datas, visualização de dados brutos e gráfico histórico, com exportação em CSV e XLSX para auditoria e análise externa.
              </p>

              <img
                src="/images/termocar-reports.png"
                alt="Tela de relatórios e exportação"
                className={styles.screenshot}
                style={spaced}
              />

              <h2>Integrações Industriais</h2>
              <p>
                O TermoCar conversa com os sistemas que já existem na planta, sem exigir troca de infraestrutura.
              </p>
              <ul>
                <li><strong>OPC-UA:</strong> leitura do pulso de início de ciclo e da velocidade do carro no DCS/PLC, com monitoramento da qualidade da conexão.</li>
                <li><strong>Datalogger Campbell Scientific:</strong> leitura por arquivo CSV, consulta SQL ou API REST.</li>
                <li><strong>PIMS corporativo:</strong> envio dos dados por REST, ODBC ou UFL, com fila de reenvio para falhas de comunicação.</li>
              </ul>

              <img
                src="/images/termocar-arquitetura.jpg"
                alt="Diagrama de integração: DeltaV via OPC-UA, datalogger, TermoCar e PIMS"
                className={styles.screenshot}
                style={spaced}
              />

              <h2>Segurança e Perfis de Acesso</h2>
              <p>
                Perfis de <strong>Administrador</strong> e <strong>Operador</strong>. O operador visualiza dashboard, mapa 3D, histórico e relatórios; configurações de ativos, mapeamentos e conexões ficam restritas ao administrador, bloqueadas tanto na interface quanto na API.
              </p>
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.techBox}>
                <h4>Características Técnicas</h4>
                <ul className={styles.techList}>
                  <li><Thermometer size={18} /> 16 Termopares por Carro</li>
                  <li><Timer size={18} /> Aquisição a 1 Hz</li>
                  <li><Box size={18} /> Mapa Térmico 3D por Ciclo</li>
                  <li><GitCompare size={18} /> Comparação de Ciclos</li>
                  <li><Cable size={18} /> OPC-UA e Datalogger Campbell</li>
                  <li><Send size={18} /> Integração PIMS (REST, ODBC, UFL)</li>
                  <li><FileSpreadsheet size={18} /> Exportação CSV e XLSX</li>
                  <li><ShieldCheck size={18} /> Acesso por Perfil</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
