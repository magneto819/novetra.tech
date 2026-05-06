import styles from './WhyUs.module.css';
import type { SiteContent } from '../content/siteContent';

type WhyUsProps = {
  content: SiteContent['whyUs'];
};

export default function WhyUs({ content }: WhyUsProps) {
  return (
    <section className={`section ${styles.whyUs}`} id="why-us">
      <div className={styles.bgOrb}></div>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">{content.label}</span>
          <h2 className="section-title">{content.title}</h2>
          <p className="section-subtitle">
            {content.subtitle}
          </p>
        </div>

        <div className={styles.grid}>
          {content.reasons.map((r) => (
            <div key={r.title} className={styles.card}>
              <div className={styles.icon}>{r.icon}</div>
              <h3 className={styles.title}>{r.title}</h3>
              <p className={styles.desc}>{r.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.vision}>
          <div className={styles.visionInner}>
            <div className={styles.visionIcon}>{content.visionIcon}</div>
            <div className={styles.visionText}>
              <div className={styles.visionLabel}>{content.visionLabel}</div>
              <p className={styles.visionBody}>
                {content.visionText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
