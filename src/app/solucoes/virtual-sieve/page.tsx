
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Camera, Server, Lock, Microscope } from 'lucide-react';
import styles from '../solucao.module.css';

export default function VirtualSievePage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={`heading-xl ${styles.heroTitle}`}>
              Virtual<span className="text-gradient-blue">Sieve</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Análise Granulométrica Industrial por Visão Computacional. Distribuição de tamanho de partículas em tempo real, sem interromper o processo produtivo.
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={`container ${styles.grid}`}>
            <article className={styles.article}>
              <blockquote>
                Substitui a peneira física por câmeras posicionadas estrategicamente, analisando o material continuamente. O nome diz tudo: uma peneira virtual.
              </blockquote>

              <img 
                src="/images/virtualsieve1.png" 
                alt="Detecções do VirtualSieve em tempo real" 
                className={styles.screenshot} 
              />

              <h2>O Problema no Processo</h2>
              <p>
                Na indústria química, o controle granulométrico é crítico para qualidade e rendimento. Tradicionalmente, essa análise depende de peneiramento manual — um processo lento, sujeito a erro humano e com atraso em relação à produção.
              </p>

              <h2>Pipeline de Visão Computacional</h2>
              <p>Executando em tempo real (em CPU) para múltiplas câmeras industriais:</p>
              <ul>
                <li><strong>Captura:</strong> Suporte a câmeras USB, IP e streams RTSP.</li>
                <li><strong>Segmentação Clássica:</strong> OpenCV com limiarização adaptativa e separação Watershed.</li>
                <li><strong>Segmentação Deep Learning:</strong> Modelos YOLO26 para cenários e fundos mais complexos.</li>
                <li><strong>Medição:</strong> Cálculo de área, diâmetro equivalente e classificação em faixas granulométricas (sieve ranges).</li>
              </ul>

              <h2>Arquitetura Web Moderna</h2>
              <p>
                O sistema é baseado em uma arquitetura Cliente/Servidor robusta, combinando um backend em Python (FastAPI) e frontend em Next.js (React).
              </p>
              <p>
                A separação por threads garante o <strong>suporte multi-câmera com isolamento total</strong>: o padrão Produtor-Consumidor isola captura e processamento em threads dedicadas por câmera.
              </p>

              <h2>Segurança & Rastreabilidade</h2>
              <p>
                A calibração do sistema é visual, convertendo milímetros em pixels (mm/px) através de amostragem na própria tela. Além disso, a segurança industrial foi construída como prioridade:
              </p>
              <ul>
                <li>Autenticação JWT com cookies HttpOnly.</li>
                <li>RBAC (Administrador vs Operador).</li>
                <li>Hash de senhas com Argon2.</li>
                <li>Log de auditoria (audit log) de todas as ações.</li>
              </ul>
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.techBox}>
                <h4>Stack Tecnológica</h4>
                <ul className={styles.techList}>
                  <li><Camera size={18} /> OpenCV & YOLO26</li>
                  <li><Server size={18} /> FastAPI Backend</li>
                  <li><Microscope size={18} /> Next.js Frontend</li>
                  <li><Lock size={18} /> JWT & Argon2</li>
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
