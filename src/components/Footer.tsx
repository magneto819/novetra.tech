import styles from './Footer.module.css';
import type { SiteContent } from '../content/siteContent';

type FooterProps = {
  brand: SiteContent['brand'];
  content: SiteContent['footer'];
};

export default function Footer({ brand, content }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.divider}></div>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>{brand.logoLetter}</span>
              <span className={styles.logoText}>
                {brand.chineseName}
                <em>{brand.englishName}</em>
              </span>
            </div>
            <p className={styles.tagline}>
              {brand.tagline}
            </p>
            <div className={styles.relatedSites}>
              <div className={styles.relatedHeader}>
                <h4>{content.relatedTitle}</h4>
                <p>{content.relatedDescription}</p>
              </div>
              <div className={styles.relatedGrid}>
                {content.relatedSites.map((site) => (
                  <a
                    key={site.href}
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.relatedCard}
                  >
                    <span className={styles.relatedTag}>{site.tag}</span>
                    <span className={styles.relatedTitle}>{site.title}</span>
                    <span className={styles.relatedArrow}>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.links}>
            {content.linkGroups.map((group) => (
              <div key={group.title} className={styles.linkGroup}>
                <h4>{group.title}</h4>
                {group.links.map((link) => (
                  <a key={`${group.title}-${link.href}-${link.label}`} href={link.href}>{link.label}</a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} {content.copyright}</p>
          <p className={styles.location}>{content.location}</p>
        </div>
      </div>
    </footer>
  );
}
