import styles from './Hero.module.css';
import type { SiteContent } from '../content/siteContent';

type HeroProps = {
  content: SiteContent['hero'];
};

export default function Hero({ content }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.grid}></div>
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

      <div className={`container ${styles.content}`}>
        <div className={styles.badge}>
          <span className={styles.dot}></span>
          {content.badge}
        </div>

        <h1 className={styles.headline}>
          <span className={styles.lineTop}>{content.titleTop}</span>
          <span className={styles.lineSub}>
            {content.titleMain} <span className={styles.accent}>{content.titleAccent}</span>
          </span>
        </h1>

        <p className={styles.tagline}>
          {content.taglineLines.map((line, index) => (
            <span key={line}>
              {line}
              {index < content.taglineLines.length - 1 && <br className={styles.br} />}
            </span>
          ))}
        </p>

        <div className={styles.actions}>
          <a href={content.primaryCta.href} className={styles.btnPrimary}>{content.primaryCta.label}</a>
          <a href={content.secondaryCta.href} className={styles.btnOutline}>{content.secondaryCta.label}</a>
        </div>

        <div className={styles.stats}>
          {content.stats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scrollHint}>
        <span></span>
        {content.scrollHint}
      </div>
    </section>
  );
}
