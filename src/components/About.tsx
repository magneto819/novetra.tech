import styles from './About.module.css';
import type { SiteContent } from '../content/siteContent';

type AboutProps = {
  content: SiteContent['about'];
};

export default function About({ content }: AboutProps) {
  return (
    <section className={`section ${styles.about}`} id="about">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.visual}>
            <div className={styles.card}>
              <div className={styles.cardGlow}></div>
              <div className={styles.cardInner}>
                <div className={styles.iconGrid}>
                  {content.visualIcons.map((icon, i) => (
                    <div key={i} className={styles.iconBox} style={{ animationDelay: `${i * 0.15}s` }}>
                      {icon}
                    </div>
                  ))}
                </div>
                <div className={styles.cardLabel}>{content.cardLabel}</div>
              </div>
            </div>
            <div className={styles.floatingBadge}>
              <div className={styles.badgeDot}></div>
              <span>{content.floatingBadge}</span>
            </div>
          </div>

          <div className={styles.text}>
            <span className="section-label">{content.label}</span>
            <h2 className="section-title">
              {content.titleLines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < content.titleLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.body}>{paragraph}</p>
            ))}

            <div className={styles.pillList}>
              {content.highlights.map((p) => (
                <span key={p} className={styles.pill}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
