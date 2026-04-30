import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BatteryCharging, Map, BellRing, LineChart } from 'lucide-react';
import styles from '../solucao.module.css';

export default function UpsMonitorPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={`heading-xl ${styles.heroTitle}`}>
              UPS-<span className="text-gradient-amber">Monitor</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Plataforma definitiva de telemetria e gestão centralizada para Nobreaks corporativos, com integração SNMP e IoT via LoRaWAN.
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={`container ${styles.grid}`}>
            <article className={styles.article}>
              <blockquote>
                Antecipe falhas de energia, gerencie a autonomia das suas baterias e monitore ativos geograficamente distribuídos em um único Operations Center em tempo real.
              </blockquote>

              <img 
                src="/images/ups-monitor-1.png" 
                alt="Dashboard Principal do Operations Center" 
                className={styles.screenshot} 
              />

              <h2>Proteção Proativa para Infraestrutura Crítica</h2>
              <p>
                Para Data Centers (CPDs), hospitais e indústrias, uma queda de energia sem o devido suporte do Nobreak (UPS) pode causar prejuízos incalculáveis. O <strong>UPS-Monitor</strong> elimina a gestão "às cegas" dos seus nobreaks, unificando equipamentos de diferentes fabricantes (APC, Schneider, Intelbras, NHS, etc.) em uma única plataforma visual.
              </p>

              <h2>Visibilidade Total e Distribuída</h2>
              <p>
                Através do uso inovador de <strong>Conversores SNMP/LoRa</strong>, o sistema alcança dispositivos em locais remotos ou de difícil acesso, exibindo-os em um mapa interativo:
              </p>
              <ul>
                <li><strong>Mapeamento Geográfico:</strong> Visualize o status em tempo real (Operacional, Alarme ou Offline) de todas as suas unidades em um Mapa via satélite.</li>
                <li><strong>Telemetria Detalhada:</strong> Monitore de perto a Potência (W), Carga (%), Temperatura Interna (°C), Nível de Bateria (%) e Autonomia Estimada (minutos) de cada nobreak individualmente.</li>
                <li><strong>Diagnóstico Instantâneo:</strong> Saiba exatamente qual rack ou subestação está operando via rede comercial ou descarregando as baterias.</li>
              </ul>

              <img 
                src="/images/ups-monitor-2.png" 
                alt="Mapa LoRaWAN de Dispositivos e Status Individual dos Nobreaks" 
                className={styles.screenshot} 
                style={{ marginTop: '2rem', marginBottom: '2rem' }}
              />

              <h2>Motor de Regras e Alarmes Inteligentes</h2>
              <p>
                Não espere o servidor desligar para descobrir que a bateria falhou. O sistema conta com um motor de regras avançado:
              </p>
              <ul>
                <li><strong>Regras Customizáveis:</strong> Crie limites específicos (Thresholds) para Temperatura Crítica, Tensão de Entrada Baixa/Alta, Sobrecarga e Nível de Bateria.</li>
                <li><strong>Severidade Dinâmica:</strong> Alarmes classificados automaticamente como <em>Warning</em> (Aviso) ou <em>Critical</em> (Crítico) para priorização da equipe de manutenção.</li>
                <li><strong>Histórico e Reconhecimento:</strong> Todo evento fica registrado, permitindo aos operadores reconhecer e gerenciar as ocorrências (Ack).</li>
              </ul>

              <img 
                src="/images/ups-monitor-4.png" 
                alt="Gráficos de Telemetria Histórica" 
                className={styles.screenshot} 
                style={{ marginTop: '2rem', marginBottom: '2rem' }}
              />

              <h2>Telemetria Histórica e Análise</h2>
              <p>
                Analise o comportamento elétrico da sua planta ao longo do tempo através de gráficos interativos de Potência, Carga, Nível de Bateria e Tensão de Saída. Os registros armazenados permitem auditorias detalhadas para planejar expansões de infraestrutura com base em dados reais de consumo.
              </p>

            </article>

            <aside className={styles.sidebar}>
              <div className={styles.techBox}>
                <h4>Características Técnicas</h4>
                <ul className={styles.techList}>
                  <li><BatteryCharging size={18} /> Compatibilidade Multi-Marcas</li>
                  <li><Map size={18} /> Geolocalização LoRaWAN</li>
                  <li><BellRing size={18} /> Motor de Regras e Alarmes</li>
                  <li><LineChart size={18} /> Telemetria e Histórico</li>
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
