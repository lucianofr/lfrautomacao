import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  tags: string[];
}

export default function ProductCard({ title, description, href, icon, tags }: ProductCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          {icon}
        </div>
        
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>

        <span className={styles.link}>
          Ver Solução <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
