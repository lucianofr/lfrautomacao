import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Zap, LineChart, Server, Download } from 'lucide-react';
import styles from '../solucao.module.css';

export default function TriadeEnergiaPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={`heading-xl ${styles.heroTitle}`}>
              Tríade <span className="text-gradient-amber">Energia</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Sistema inteligente de monitoramento, análise e gestão de consumo de energia elétrica para otimização de custos industriais.
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={`container ${styles.grid}`}>
            <article className={styles.article}>
              <blockquote>
                Tenha o controle absoluto da sua demanda de energia, identifique gargalos de consumo e evite multas de ultrapassagem de demanda com alertas em tempo real.
              </blockquote>

              <img 
                src="/images/triade-energia.png" 
                alt="Dashboard do Sistema Tríade Energia" 
                className={styles.screenshot} 
              />

              <h2>O Custo Invisível da Indústria</h2>
              <p>
                Na indústria pesada, a energia elétrica não é apenas um custo operacional, é muitas vezes um dos maiores ofensores do fluxo de caixa. O monitoramento manual ou o simples recebimento da fatura mensal no fim do ciclo não permite nenhuma ação corretiva a tempo de evitar prejuízos (como multas de ultrapassagem de pico de demanda ou baixo fator de potência).
              </p>

              <h2>Dashboard e Gestão em Tempo Real</h2>
              <p>
                O <strong>Tríade Energia</strong> atua como o seu centro de comando energético:
              </p>
              <ul>
                <li><strong>Visão Global e Direta:</strong> Acompanhe o consumo total (kWh), o pico de demanda (kW) e o custo financeiro estimado em tempo real.</li>
                <li><strong>Métricas de Qualidade (KPIs):</strong> Monitoramento contínuo de Potência Ativa, Reativa, Aparente e Fator de Potência, vitais para evitar penalidades da concessionária.</li>
                <li><strong>Gráficos de Consumo Instantâneo:</strong> Analise as flutuações de demanda ao longo do tempo (dia, semana, mês, ano) para identificar picos anormais de maquinário.</li>
                <li><strong>Análise Multi-Unidade:</strong> Compare o consumo por "Unidade Consumidora", identificando quais setores ou plantas demandam mais energia.</li>
              </ul>

              <h2>Alertas e Exportação Profissional</h2>
              <p>
                O foco da solução não é apenas mostrar dados, mas transformá-los em ações:
              </p>
              <ul>
                <li><strong>Gestão de Alertas:</strong> Sistema de notificações nativo que alerta os gestores caso o pico de demanda se aproxime do limite contratado.</li>
                <li><strong>Exportação Inteligente:</strong> Gere relatórios sob demanda ou agendados, com suporte direto para arquivos CSV, Excel e PDF para fácil integração contábil.</li>
                <li><strong>Previsão de Custo:</strong> Estimativa financeira progressiva, permitindo planejamento orçamentário muito antes do fechamento da fatura.</li>
              </ul>
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.techBox}>
                <h4>Características Técnicas</h4>
                <ul className={styles.techList}>
                  <li><Zap size={18} /> Monitoramento em Tempo Real</li>
                  <li><LineChart size={18} /> Gráficos e Dashboards Analíticos</li>
                  <li><Server size={18} /> Integração com Medidores de Borda</li>
                  <li><Download size={18} /> Exportação CSV, Excel e PDF</li>
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
