
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Crosshair, Network, Cpu } from 'lucide-react';
import styles from '../solucao.module.css';

export default function SafeGuardPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={`heading-xl ${styles.heroTitle}`}>
              SafeGuard <span className="text-gradient-yellow">Vision</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Sistema de segurança industrial que une YOLO, comunicação industrial (Modbus/OPC UA) e dashboard em tempo real para prevenir acidentes em ambientes de alto risco.
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={`container ${styles.grid}`}>
            <article className={styles.article}>
              <blockquote>
                Parada de emergência automática, sem depender do reflexo humano.
              </blockquote>

              <img 
                src="/images/safeguard.jpeg" 
                alt="SafeGuard Vision Interface" 
                className={styles.screenshot} 
              />

              <h2>O Problema no Chão de Fábrica</h2>
              <p>
                Todo ano, milhares de acidentes em plantas industriais acontecem no mesmo padrão: um operador entra em uma zona de risco em <strong>um segundo</strong>, e o tempo de reação humana simplesmente não é suficiente. Sensores físicos ajudam, mas cobrem áreas limitadas e <strong>não entendem o contexto</strong> da cena.
              </p>
              <p>
                O <strong>SafeGuard</strong> ataca esse problema combinando visão computacional moderna com comunicação industrial nativa: uma câmera IP já existente vira um sensor inteligente que, em milissegundos, manda o CLP parar a máquina e acionar a sirene.
              </p>

              <h2>O que o SafeGuard Resolve</h2>
              <ul>
                <li><strong>Invasão de zona perigosa:</strong> Detecção por classe (pessoa, carro, caminhão) e análise de polígonos de risco.</li>
                <li><strong>Operação sem EPI:</strong> Modo "PPE Absence" detecta ausência de equipamento obrigatório.</li>
                <li><strong>Princípio de incêndio:</strong> Pipeline paralelo de detecção de fogo e fumaça.</li>
                <li><strong>Reação humana lenta:</strong> Envio direto ao CLP via Modbus TCP ou OPC UA em tempo real.</li>
                <li><strong>Falta de rastreabilidade:</strong> Screenshots e histórico SQLite de cada evento.</li>
              </ul>

              <h2>Desafios Técnicos Solucionados</h2>
              
              <img 
                src="/images/safeguard2.jpeg" 
                alt="Detecções do SafeGuard Vision" 
                className={styles.screenshot} 
              />

              <h3>Latência Fim-a-Fim sob Controle</h3>
              <p>
                Entre frame capturado e coil escrito no CLP, o objetivo é ficar abaixo de 300 ms. Isso exigiu um pipeline 100% assíncrono e event bus desacoplado para que a UI nunca atrase o caminho crítico de shutdown.
              </p>

              <h3>Robustez contra Falsos Positivos</h3>
              <p>
                A combinação de histerese por classe, filtro de confiança, polígonos de zona e debounce reduz drasticamente disparos espúrios sem sacrificar a sensibilidade.
              </p>

              <h3>Execução em Edge</h3>
              <p>
                YOLO11n foi escolhido para rodar em mini PCs industriais e Jetson Nano/Orin, sem depender da nuvem.
              </p>
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.techBox}>
                <h4>Stack Tecnológica</h4>
                <ul className={styles.techList}>
                  <li><Crosshair size={18} /> Ultralytics YOLO11</li>
                  <li><Network size={18} /> Modbus TCP & OPC UA</li>
                  <li><Cpu size={18} /> Python 3.11+ & FastAPI</li>
                  <li><ShieldCheck size={18} /> Arq. Hexagonal (Ports & Adapters)</li>
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
