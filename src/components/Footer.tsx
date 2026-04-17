import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.divider}></div>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>N</span>
              <span className={styles.logoText}>
                新纬科技
                <em>Novetra Tech</em>
              </span>
            </div>
            <p className={styles.tagline}>
              立足东南亚，驱动数字未来
            </p>
            <div className={styles.relatedSites}>
              <h4>关联网站和项目</h4>
              <a href="https://capture.novetra.tech/" target="_blank" rel="noopener noreferrer">
                Capture the World Anytime, Anywhere
              </a>
              <a href="https://cbai.novetra.tech/" target="_blank" rel="noopener noreferrer">
                柬埔寨商业活跃指数
              </a>
              <a href="https://cdckh.novetra.tech/" target="_blank" rel="noopener noreferrer">
                柬埔寨发展理事会中文门户
              </a>
              <a href="https://readyforcambodia.novetra.tech/" target="_blank" rel="noopener noreferrer">
                出海柬埔寨体质测试
              </a>
              <a href="https://2026amcham.novetra.tech/" target="_blank" rel="noopener noreferrer">
                2026 柬埔寨美国商业展望报告
              </a>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4>业务领域</h4>
              <a href="#services">数字平台开发</a>
              <a href="#services">移动应用开发</a>
              <a href="#services">AI 智能系统</a>
            </div>
            <div className={styles.linkGroup}>
              <h4>公司</h4>
              <a href="#about">关于我们</a>
              <a href="#why-us">我们的优势</a>
              <a href="#contact">联系我们</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} 新纬科技 Novetra Tech. All rights reserved.</p>
          <p className={styles.location}>📍 金边，柬埔寨</p>
        </div>
      </div>
    </footer>
  );
}
