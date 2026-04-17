import styles from './WhyUs.module.css';

const reasons = [
  {
    icon: '🌏',
    title: '深耕东盟市场',
    desc: '理解区域商业环境，熟悉东南亚市场规则、文化差异与商业习惯，为企业提供本地化技术策略。',
  },
  {
    icon: '🔀',
    title: '中国技术能力与本地经验',
    desc: '兼具中国领先的技术研发能力与柬埔寨本地落地经验，跨越语言与文化壁垒。',
  },
  {
    icon: '💡',
    title: '产品思维驱动',
    desc: '拥有产品思维，而非单纯开发思维。我们从业务目标出发，设计真正解决问题的数字产品。',
  },
  {
    icon: '🤝',
    title: '长期合作与系统性构建',
    desc: '注重长期合作与系统性构建，做客户可信赖的数字战略伙伴，而不只是项目外包供应商。',
  },
  {
    icon: '🤖',
    title: 'AI 能力整合落地',
    desc: 'AI 能力整合与应用落地能力强，将最新 AI 技术切实融入客户产品，保持竞争优势。',
  },
  {
    icon: '📈',
    title: '交付可持续增长系统',
    desc: '我们不仅交付代码，更交付可持续的增长系统，帮助客户实现长期数字化价值。',
  },
];

export default function WhyUs() {
  return (
    <section className={`section ${styles.whyUs}`} id="why-us">
      <div className={styles.bgOrb}></div>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">为什么选择我们</span>
          <h2 className="section-title">新纬科技的优势</h2>
          <p className="section-subtitle">
            我们不仅仅是技术服务商，而是您企业数字化转型道路上最可信赖的长期合作伙伴。
          </p>
        </div>

        <div className={styles.grid}>
          {reasons.map((r) => (
            <div key={r.title} className={styles.card}>
              <div className={styles.icon}>{r.icon}</div>
              <h3 className={styles.title}>{r.title}</h3>
              <p className={styles.desc}>{r.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.vision}>
          <div className={styles.visionInner}>
            <div className={styles.visionIcon}>🚀</div>
            <div className={styles.visionText}>
              <div className={styles.visionLabel}>我们的愿景</div>
              <p className={styles.visionBody}>
                成为东盟领先的<strong>数字基础设施构建者</strong>与 <strong>AI 解决方案提供商</strong>。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
