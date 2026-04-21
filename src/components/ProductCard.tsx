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
  const isExternal = href.startsWith('http');
  
  return (
    <div className={styles.card}>
      <Link 
        href={href} 
        className={styles.fullLink} 
        aria-label={`Ver detalhes sobre ${title}`} 
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      />
      
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
  );
}
