import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { ShieldAlert, Activity, BrainCircuit, Scan } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBg}></div>
          <div className={`container ${styles.heroContent}`}>
            <div className={`${styles.badge} animate-fade-in`}>
              <span className="pulse-dot"></span> Edge Computing & IA Industrial
            </div>
            <h1 className={`heading-xl animate-fade-in delay-100`}>
              Controle Avançado para o <br/>
              <span className="text-gradient-yellow">Chão de Fábrica</span>
            </h1>
            <p className={`${styles.heroDescription} animate-fade-in delay-200`}>
              A LFR Automação é uma consultoria especializada em otimização de processos 
              industriais. Transformamos dados em ações autônomas utilizando Inteligência 
              Artificial, Visão Computacional e Arquiteturas Edge.
            </p>
            <div className={`${styles.heroActions} animate-fade-in delay-300`}>
              <a href="#solucoes" className="btn-primary">Explorar Soluções</a>
              <a href="#metodologia" className="btn-outline">Nossa Metodologia</a>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section id="metodologia" className={`section ${styles.methodology}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className="heading-lg">Engenharia de <span className="text-gradient-blue">Precisão</span></h2>
              <p>Nossa abordagem não se baseia em "caixas pretas", mas sim em fundamentos de engenharia aplicados à fronteira da tecnologia computacional.</p>
            </div>
            
            <div className={styles.methodGrid}>
              <div className={styles.methodCard}>
                <h3>Modelagem de Processos</h3>
                <p>Compreensão profunda das dinâmicas químicas e físicas antes de aplicar qualquer otimização matemática.</p>
              </div>
              <div className={styles.methodCard}>
                <h3>Arquitetura Edge</h3>
                <p>Processamento local robusto, garantindo latência mínima e segurança cibernética sem depender de conectividade externa constante.</p>
              </div>
              <div className={styles.methodCard}>
                <h3>Integração Nativa</h3>
                <p>Comunicação direta com CLPs e DCSs através de protocolos industriais (OPC-UA, Modbus TCP) sem intermediários frágeis.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solucoes" className={`section ${styles.solutions}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className="heading-lg">Nossas <span className="text-gradient-yellow">Soluções</span></h2>
              <p>Ferramentas avançadas desenvolvidas para resolver os gargalos mais críticos da indústria de processos.</p>
            </div>

            <div className="grid grid-cols-2">
              <ProductCard 
                title="SafeGuard Vision"
                description="Sistema de segurança industrial com Visão Computacional (YOLO) e integração direta ao CLP para parada de emergência autônoma."
                href="/solucoes/safeguard"
                icon={<ShieldAlert size={28} />}
                tags={['YOLO11', 'Visão Computacional', 'Modbus/OPC-UA', 'Segurança']}
              />
              <ProductCard 
                title="SensorPredict"
                description="Criação e operação de Soft Sensors inteligentes em tempo real para inferência de qualidade em processos não lineares."
                href="/solucoes/sensor-predict"
                icon={<Activity size={28} />}
                tags={['Soft Sensors', 'PLS', 'LSTM', 'OPC-UA']}
              />
              <ProductCard 
                title="Smart PID Edge"
                description="Otimização autônoma de malhas PID usando Lógica Fuzzy e Aprendizado por Reforço (RL) em uma plataforma headless."
                href="/solucoes/smart-pid"
                icon={<BrainCircuit size={28} />}
                tags={['Fuzzy Logic', 'RL', 'PID Tuning', 'Edge Platform']}
              />
              <ProductCard 
                title="VirtualSieve"
                description="Análise granulométrica industrial em tempo real através de visão computacional, substituindo peneiramentos manuais."
                href="/solucoes/virtual-sieve"
                icon={<Scan size={28} />}
                tags={['FastAPI', 'Next.js', 'Segmentação', 'Controle de Qualidade']}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
