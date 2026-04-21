
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Activity, BrainCircuit, LineChart, Database } from 'lucide-react';
import styles from '../solucao.module.css';

export default function SensorPredictPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={`heading-xl ${styles.heroTitle}`}>
              Sensor<span className="text-gradient-blue">Predict</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Soft Sensors inteligentes para a Indústria de Processos. Inferência contínua de qualidade rodando na sua tela com alarmes, métricas e gráficos atualizados em tempo real.
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={`container ${styles.grid}`}>
            <article className={styles.article}>
              <blockquote>
                Você treina um modelo, aperta um botão, e passa a ter uma inferência contínua de qualidade.
              </blockquote>

              <img 
                src="/images/sensorpredict1.png" 
                alt="Interface do SensorPredict" 
                className={styles.screenshot} 
              />

              <h2>O que é o SensorPredict?</h2>
              <p>
                Uma ferramenta desktop open-source para criação e operação de sensores virtuais (soft sensors) em tempo real. Ele conecta-se diretamente ao seu sistema de automação via OPC-UA, lê variáveis de processo, combina com entradas manuais de laboratório e executa modelos preditivos para estimar variáveis de qualidade caras ou lentas de medir diretamente.
              </p>
              
              <h2>Técnicas de Modelagem</h2>
              <p>A ferramenta oferece três abordagens de modelagem com auto-tune de hiperparâmetros via Optuna:</p>
              <ul>
                <li><strong>PLS (Partial Least Squares):</strong> Robusto, interpretável, ideal para processos lineares e bem conhecidos.</li>
                <li><strong>ESN (Echo State Networks):</strong> Redes recorrentes de reservatório para capturar dinâmicas não-lineares temporais.</li>
                <li><strong>LSTM (Long Short-Term Memory):</strong> Deep learning para os casos mais complexos com dinâmicas lentas.</li>
              </ul>

              <h2>Funcionalidades Principais</h2>
              
              <img 
                src="/images/sensorpredict2.png" 
                alt="Gráficos e predições do SensorPredict" 
                className={styles.screenshot} 
              />

              <ul>
                <li>Conexão OPC-UA bidirecional (lê variáveis e escreve predições de volta no servidor).</li>
                <li>Pré-processamento configurável: normalização, remoção de outliers, imputação, lag.</li>
                <li>Dashboard de monitoramento com métricas (RMSE, R², MAE) em tempo real.</li>
                <li>Gráficos de contribuição SPE por variável para diagnóstico de falhas.</li>
                <li>Treinamento online com coleta de dados ao vivo.</li>
              </ul>

              <h2>Desenvolvido com Inteligência Artificial</h2>
              <p>
                Todo o código-fonte — arquitetura hexagonal, adaptadores OPC-UA, modelos preditivos, interface gráfica, testes automatizados — foi desenvolvido em parceria com IA (Claude Code), provando como a IA generativa acelera a criação de ferramentas de engenharia especializadas.
              </p>
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.techBox}>
                <h4>Stack Tecnológica</h4>
                <ul className={styles.techList}>
                  <li><Activity size={18} /> PyQt6 & PyQtGraph</li>
                  <li><BrainCircuit size={18} /> TensorFlow / Keras (LSTM)</li>
                  <li><Database size={18} /> scikit-learn & Optuna</li>
                  <li><LineChart size={18} /> asyncua (OPC-UA assíncrono)</li>
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
