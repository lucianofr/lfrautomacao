
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Layers, Zap, Settings, GitFork } from 'lucide-react';
import styles from '../solucao.module.css';

export default function SmartPidPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={`heading-xl ${styles.heroTitle}`}>
              Smart PID <span className="text-gradient-yellow">Edge</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Inteligência Artificial Otimizando Malhas de Controle Industrial em Tempo Real. Um engenheiro de controle que nunca dorme e ajusta suas malhas PID 24/7.
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={`container ${styles.grid}`}>
            <article className={styles.article}>
              <blockquote>
                Na indústria de processos, mais de 60% das malhas de controle PID operam com sintonia subótima.
              </blockquote>

              <img 
                src="/images/smartpid1.png" 
                alt="Interface do Smart PID Edge" 
                className={styles.screenshot} 
              />

              <h2>Apresentando a Plataforma</h2>
              <p>
                O <strong>Smart PID Edge Platform</strong> é um sistema open-source de otimização de malhas PID industriais que combina Lógica Fuzzy, Aprendizado por Reforço (RL) e uma arquitetura de software de nível enterprise para entregar self-tuning autônomo em tempo real.
              </p>
              <p>
                A plataforma opera como um Edge Optimizer: um daemon headless que roda em um PC industrial ao lado do CLP, conectando-se via OPC-UA para ler variáveis de processo e escrever ajustes de sintonia diretamente no controlador com guardrails de segurança.
              </p>

              <h2>Inteligência Artificial Matemática</h2>
              <p>O sistema oferece estratégias de otimização selecionáveis independentemente por malha:</p>
              <ul>
                <li><strong>NONE:</strong> O PID opera com sintonia fixa (ideal para comissionamento).</li>
                <li><strong>FUZZY (Zero-Touch):</strong> Motor de inferência com 7 conjuntos fuzzy e 3 matrizes de regras. A saída modula o ganho integral dinamicamente.</li>
                <li><strong>RL (Reinforcement Learning):</strong> Agente SAC/PPO com treinamento online contínuo e objetivos de controle adaptativos.</li>
              </ul>

              <h2>Arquitetura: Robustez Industrial</h2>
              <h3>Backend (Core Engine)</h3>
              <p>Daemon headless responsável pela lógica crítica (PID, IA, alarmes, persistência) operando via OPC-UA e SQLite em modo WAL para escrita concorrente sem locks. A comunicação de telemetria é feita via barramento ZeroMQ (TCP PUB/SUB).</p>
              
              <h3>Frontend (HMI Desktop)</h3>
              <p>Aplicação cliente em PySide6 seguindo a norma ISA-101 para salas de controle, com tema Dark Room focado em emissão mínima de luz.</p>

              <h2>Casos de Uso Reais</h2>
              <ul>
                <li><strong>Refinarias:</strong> Otimização de malhas lentas de temperatura (Fuzzy com Disturbance Rejection).</li>
                <li><strong>Mineração:</strong> Controle de nível em vasos pulmão (Surge Level).</li>
                <li><strong>Celulose:</strong> Malhas de vazão rápida com micro-ajustes a cada ciclo.</li>
              </ul>
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.techBox}>
                <h4>Stack Tecnológica</h4>
                <ul className={styles.techList}>
                  <li><Layers size={18} /> Arquitetura Hexagonal</li>
                  <li><Zap size={18} /> ZeroMQ & FastAPI</li>
                  <li><Settings size={18} /> Lógica Fuzzy & RL</li>
                  <li><GitFork size={18} /> PySide6 (HMI ISA-101)</li>
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
