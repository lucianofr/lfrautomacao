'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cpu } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();

  const isSolutionsActive = pathname.startsWith('/solucoes');

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          <Cpu className={styles.logoIcon} size={28} />
          LFR<span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>AUTOMAÇÃO</span>
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>
              Início
            </Link>
          </li>
          <li>
            <Link href="/#solucoes" className={`${styles.navLink} ${isSolutionsActive ? styles.active : ''}`}>
              Soluções Edge
            </Link>
          </li>
          <li>
            <a href="https://dimgrey-gnu-525245.hostingersite.com/" target="_blank" rel="noopener noreferrer" className={styles.navLink}>
              Portfólio
            </a>
          </li>
          <li>
            <a href="https://luciano-franca-rocha-cv.com.br/" target="_blank" rel="noopener noreferrer" className={styles.navLink}>
              Currículo
            </a>
          </li>
        </ul>

        <Link href="mailto:luciano82@gmail.com" className={`btn-outline ${styles.contactBtn}`}>
          Falar com Especialista
        </Link>
      </div>
    </nav>
  );
}
