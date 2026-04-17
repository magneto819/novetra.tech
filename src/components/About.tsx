import styles from './About.module.css';

export default function About() {
  return (
    <section className={`section ${styles.about}`} id="about">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.visual}>
            <div className={styles.card}>
              <div className={styles.cardGlow}></div>
              <div className={styles.cardInner}>
                <div className={styles.iconGrid}>
                  {['🌐', '📱', '🤖', '📊', '🔗', '💡'].map((icon, i) => (
                    <div key={i} className={styles.iconBox} style={{ animationDelay: `${i * 0.15}s` }}>
                      {icon}
                    </div>
                  ))}
                </div>
                <div className={styles.cardLabel}>数字化转型伙伴</div>
              </div>
            </div>
            <div className={styles.floatingBadge}>
              <div className={styles.badgeDot}></div>
              <span>服务东南亚企业</span>
            </div>
          </div>

          <div className={styles.text}>
            <span className="section-label">公司简介</span>
            <h2 className="section-title">新纬科技<br />Novetra Tech</h2>
            <p className={styles.body}>
              新纬科技是一家立足柬埔寨、服务东盟市场的创新科技公司，专注于网站开发、移动应用开发、人工智能系统构建及数字内容制作。
            </p>
            <p className={styles.body}>
              我们致力于为企业打造完整的数字基础设施，帮助客户实现从传统经营模式向<strong>智能化、数据化、平台化</strong>的升级转型。
            </p>
            <p className={styles.body}>
              在人工智能快速重塑商业生态的时代，新纬科技不仅提供技术服务，更成为企业长期的<strong>数字战略伙伴</strong>。
            </p>

            <div className={styles.pillList}>
              {['网站开发', '移动应用', 'AI 系统', '数字内容', '东南亚市场'].map((p) => (
                <span key={p} className={styles.pill}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
