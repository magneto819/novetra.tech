import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid}></div>
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

      <div className={`container ${styles.content}`}>
        <div className={styles.badge}>
          <span className={styles.dot}></span>
          立足东南亚 · 驱动数字未来
        </div>

        <h1 className={styles.headline}>
          <span className={styles.lineTop}>新纬科技</span>
          <span className={styles.lineSub}>
            Novetra <span className={styles.accent}>Tech</span>
          </span>
        </h1>

        <p className={styles.tagline}>
          专注于网站开发、移动应用、AI 智能系统与数字内容，
          <br className={styles.br} />
          助力企业实现从传统到智能的全面数字化升级。
        </p>

        <div className={styles.actions}>
          <a href="#services" className={styles.btnPrimary}>探索业务领域</a>
          <a href="#contact" className={styles.btnOutline}>立即咨询</a>
        </div>

        <div className={styles.stats}>
          {[
            { value: '10+', label: '核心业务领域' },
            { value: '东南亚', label: '服务市场' },
            { value: 'AI', label: '智能驱动' },
          ].map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scrollHint}>
        <span></span>
        向下滚动
      </div>
    </section>
  );
}
