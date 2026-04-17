import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '公司简介', href: '#about' },
    { label: '业务领域', href: '#services' },
    { label: '为什么选择我们', href: '#why-us' },
    { label: '联系我们', href: '#contact' },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          <span className={styles.logoIcon}>N</span>
          <span className={styles.logoText}>
            新纬科技 <em>Novetra Tech</em>
          </span>
        </a>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className={styles.ctaBtn}>联系我们</a>

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
