import styles from './Services.module.css';
import type { SiteContent } from '../content/siteContent';

type ServicesProps = {
  content: SiteContent['services'];
};

export default function Services({ content }: ServicesProps) {
  return (
    <section className={`section ${styles.services}`} id="services">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">{content.label}</span>
          <h2 className="section-title">{content.title}</h2>
          <p className="section-subtitle">
            {content.subtitle}
          </p>
        </div>

        <div className={styles.grid}>
          {content.cards.map((service) => (
            <div key={service.id} className={styles.card}>
              <div
                className={styles.cardTop}
                style={{ '--accent': service.color } as React.CSSProperties}
              >
                <div className={styles.iconWrap}>
                  <span className={styles.icon}>{service.icon}</span>
                </div>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardSubtitle}>{service.subtitle}</p>
                </div>
              </div>

              <ul className={styles.list}>
                {service.items.map((item) => (
                  <li key={item} className={styles.listItem}>
                    <span className={styles.check} style={{ color: service.color }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div
                className={styles.cardGlow}
                style={{ background: `radial-gradient(circle at 20% 80%, ${service.color}18, transparent 60%)` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
