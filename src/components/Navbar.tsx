import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import type { SiteContent } from '../content/siteContent';

type NavbarProps = {
  brand: SiteContent['brand'];
  nav: SiteContent['nav'];
};

export default function Navbar({ brand, nav }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          <span className={styles.logoIcon}>{brand.logoLetter}</span>
          <span className={styles.logoText}>
            {brand.chineseName} <em>{brand.englishName}</em>
          </span>
        </a>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          {nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href={nav.ctaHref} className={styles.ctaBtn}>{nav.ctaLabel}</a>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? styles.barOpen1 : ''}></span>
          <span className={menuOpen ? styles.barOpen2 : ''}></span>
          <span className={menuOpen ? styles.barOpen3 : ''}></span>
        </button>
      </div>
    </nav>
  );
}
