import Link from 'next/link';
import { Cpu } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <Cpu className={styles.logoIcon} size={24} />
              LFR<span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>AUTOMAÇÃO</span>
            </Link>
            <p>
              Otimização de processos e controle avançado industrial. 
              Unindo Inteligência Artificial, Visão Computacional e Arquiteturas Edge 
              para transformar o chão de fábrica.
            </p>
          </div>
          
          <div className={styles.column}>
            <h4>Soluções</h4>
            <ul className={styles.links}>
              <li><Link href="/solucoes/safeguard">SafeGuard</Link></li>
              <li><Link href="/solucoes/sensor-predict">SensorPredict</Link></li>
              <li><Link href="/solucoes/smart-pid">Smart PID Edge</Link></li>
              <li><Link href="/solucoes/virtual-sieve">VirtualSieve</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Links Rápidos</h4>
            <ul className={styles.links}>
              <li><a href="https://luciano-franca-rocha-cv.com.br/" target="_blank" rel="noopener noreferrer">Currículo Online</a></li>
              <li><a href="https://dimgrey-gnu-525245.hostingersite.com/" target="_blank" rel="noopener noreferrer">Portfólio de Projetos</a></li>
              <li><a href="https://termopares.click/" target="_blank" rel="noopener noreferrer">Termopares.click</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Contato</h4>
            <ul className={styles.links}>
              <li><a href="mailto:luciano82@gmail.com">luciano82@gmail.com</a></li>
              <li><a href="https://www.linkedin.com/in/lucianofr/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li>São Paulo, SP - Brasil</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} LFR Automação. Todos os direitos reservados.</p>
          <p>Industrial Precision & Edge Computing</p>
        </div>
      </div>
    </footer>
  );
}
