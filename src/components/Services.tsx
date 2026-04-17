import styles from './Services.module.css';

const services = [
  {
    id: 'digital',
    icon: '🌐',
    title: '数字平台开发',
    subtitle: 'Digital Platform Development',
    color: '#0ea5e9',
    items: [
      '企业官网与品牌官网',
      '电商系统与支付系统',
      '教育与培训平台',
      '园区与政企门户系统',
      '会员管理与 CRM 系统',
      '数据后台管理系统',
    ],
  },
  {
    id: 'mobile',
    icon: '📱',
    title: '移动应用开发',
    subtitle: 'Mobile App Development',
    color: '#06b6d4',
    items: [
      'iOS / Android 原生开发',
      '跨平台 App 构建',
      'Super App 架构设计',
      'B2B / B2C 平台开发',
      '本地生活与撮合类应用',
    ],
  },
  {
    id: 'ai',
    icon: '🤖',
    title: 'AI 智能系统',
    subtitle: 'AI & Intelligent Systems',
    color: '#10b981',
    items: [
      '企业知识库 AI',
      '智能客服系统',
      '大语言模型（LLM）集成',
      '数据分析与自动化系统',
      'AI 推荐与决策支持系统',
    ],
  },
  {
    id: 'content',
    icon: '🎬',
    title: '数字内容与品牌表达',
    subtitle: 'Digital Content & Brand Expression',
    color: '#f59e0b',
    items: [
      '企业宣传片制作',
      '产品演示视频',
      '3D 动画展示',
      'AI 生成内容制作',
      '短视频 IP 策划与执行',
    ],
  },
];

export default function Services() {
  return (
    <section className={`section ${styles.services}`} id="services">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">核心业务领域</span>
          <h2 className="section-title">我们的服务</h2>
          <p className="section-subtitle">
            覆盖数字化转型全链条，从战略规划到落地实施，为东南亚企业提供端到端技术解决方案。
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <div key={service.id} className={styles.card}>
              <div
                className={styles.cardTop}
                style={{ '--accent': service.color } as React.CSSProperties}
              >
                <div className={styles.iconWrap}>
                  <span className={styles.icon}>{service.icon}</span>
                </div>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardSubtitle}>{service.subtitle}</p>
                </div>
              </div>

              <ul className={styles.list}>
                {service.items.map((item) => (
                  <li key={item} className={styles.listItem}>
                    <span className={styles.check} style={{ color: service.color }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div
                className={styles.cardGlow}
                style={{ background: `radial-gradient(circle at 20% 80%, ${service.color}18, transparent 60%)` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
