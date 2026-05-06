export type NavLink = {
  label: string;
  href: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type ServiceCard = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  items: string[];
};

export type ReasonCard = {
  icon: string;
  title: string;
  desc: string;
};

export type QrCard = {
  type: string;
  imageSrc: string;
  alt: string;
  handle: string;
};

export type RelatedSite = {
  href: string;
  title: string;
  tag: string;
};

export type FooterLinkGroup = {
  title: string;
  links: NavLink[];
};

export type SiteContent = {
  brand: {
    logoLetter: string;
    chineseName: string;
    englishName: string;
    tagline: string;
  };
  nav: {
    links: NavLink[];
    ctaLabel: string;
    ctaHref: string;
  };
  hero: {
    badge: string;
    titleTop: string;
    titleMain: string;
    titleAccent: string;
    taglineLines: string[];
    primaryCta: NavLink;
    secondaryCta: NavLink;
    stats: StatItem[];
    scrollHint: string;
  };
  about: {
    label: string;
    titleLines: string[];
    paragraphs: string[];
    highlights: string[];
    visualIcons: string[];
    cardLabel: string;
    floatingBadge: string;
  };
  services: {
    label: string;
    title: string;
    subtitle: string;
    cards: ServiceCard[];
  };
  whyUs: {
    label: string;
    title: string;
    subtitle: string;
    reasons: ReasonCard[];
    visionIcon: string;
    visionLabel: string;
    visionText: string;
  };
  contact: {
    label: string;
    title: string;
    body: string;
    addressLabel: string;
    addressValue: string;
    emailLabel: string;
    email: string;
    qrLabel: string;
    qrCards: QrCard[];
    form: {
      nameLabel: string;
      namePlaceholder: string;
      companyLabel: string;
      companyPlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitLabel: string;
      loadingLabel: string;
      errorMessage: string;
      successTitle: string;
      successBody: string;
    };
  };
  footer: {
    relatedTitle: string;
    relatedDescription: string;
    relatedSites: RelatedSite[];
    linkGroups: FooterLinkGroup[];
    copyright: string;
    location: string;
  };
};

export type SiteContentSection = keyof SiteContent;

export const defaultSiteContent: SiteContent = {
  brand: {
    logoLetter: 'N',
    chineseName: '新纬科技',
    englishName: 'Novetra Tech',
    tagline: '立足东南亚，驱动数字未来',
  },
  nav: {
    links: [
      { label: '公司简介', href: '#about' },
      { label: '业务领域', href: '#services' },
      { label: '为什么选择我们', href: '#why-us' },
      { label: '联系我们', href: '#contact' },
    ],
    ctaLabel: '联系我们',
    ctaHref: '#contact',
  },
  hero: {
    badge: '立足东南亚 · 驱动数字未来',
    titleTop: '新纬科技',
    titleMain: 'Novetra',
    titleAccent: 'Tech',
    taglineLines: [
      '专注于网站开发、移动应用、AI 智能系统与数字内容，',
      '助力企业实现从传统到智能的全面数字化升级。',
    ],
    primaryCta: { label: '探索业务领域', href: '#services' },
    secondaryCta: { label: '立即咨询', href: '#contact' },
    stats: [
      { value: '10+', label: '核心业务领域' },
      { value: '东南亚', label: '服务市场' },
      { value: 'AI', label: '智能驱动' },
    ],
    scrollHint: '向下滚动',
  },
  about: {
    label: '公司简介',
    titleLines: ['新纬科技', 'Novetra Tech'],
    paragraphs: [
      '新纬科技是一家立足柬埔寨、服务东盟市场的创新科技公司，专注于网站开发、移动应用开发、人工智能系统构建及数字内容制作。',
      '我们致力于为企业打造完整的数字基础设施，帮助客户实现从传统经营模式向智能化、数据化、平台化的升级转型。',
      '在人工智能快速重塑商业生态的时代，新纬科技不仅提供技术服务，更成为企业长期的数字战略伙伴。',
    ],
    highlights: ['网站开发', '移动应用', 'AI 系统', '数字内容', '东南亚市场'],
    visualIcons: ['🌐', '📱', '🤖', '📊', '🔗', '💡'],
    cardLabel: '数字化转型伙伴',
    floatingBadge: '服务东南亚企业',
  },
  services: {
    label: '核心业务领域',
    title: '我们的服务',
    subtitle: '覆盖数字化转型全链条，从战略规划到落地实施，为东南亚企业提供端到端技术解决方案。',
    cards: [
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
    ],
  },
  whyUs: {
    label: '为什么选择我们',
    title: '新纬科技的优势',
    subtitle: '我们不仅仅是技术服务商，而是您企业数字化转型道路上最可信赖的长期合作伙伴。',
    reasons: [
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
    ],
    visionIcon: '🚀',
    visionLabel: '我们的愿景',
    visionText: '成为东盟领先的数字基础设施构建者与 AI 解决方案提供商。',
  },
  contact: {
    label: '联系我们',
    title: '开启数字化合作',
    body: '无论您是希望建立全新数字平台，还是对现有系统进行 AI 升级，我们的团队随时准备为您提供专业咨询。',
    addressLabel: '办公地址',
    addressValue: '金边，柬埔寨',
    emailLabel: '电子邮件',
    email: 'magneto.zhao@gmail.com',
    qrLabel: '💬 即时通讯 — 扫码添加',
    qrCards: [
      {
        type: 'telegram',
        imageSrc: '/image.png',
        alt: 'Telegram QR Code',
        handle: '@SHENGWEIZHAO',
      },
      {
        type: 'wechat',
        imageSrc: '/Weixin_Image_20260221115742_1096_56.jpg',
        alt: 'WeChat QR Code',
        handle: 'Shengwei',
      },
    ],
    form: {
      nameLabel: '姓名 *',
      namePlaceholder: '您的姓名',
      companyLabel: '公司名称',
      companyPlaceholder: '您的公司（选填）',
      emailLabel: '电子邮件 *',
      emailPlaceholder: 'your@email.com',
      messageLabel: '项目需求',
      messagePlaceholder: '请简要描述您的项目需求或问题...',
      submitLabel: '发送消息 →',
      loadingLabel: '发送中...',
      errorMessage: '发送失败，请稍后重试。',
      successTitle: '消息已发送！',
      successBody: '感谢您的联系，我们将在 24 小时内回复您。',
    },
  },
  footer: {
    relatedTitle: '关联网站和项目',
    relatedDescription: '了解我们已经落地的数字产品与专题项目。',
    relatedSites: [
      {
        href: 'https://capture.novetra.tech/',
        title: 'Capture the World Anytime, Anywhere',
        tag: '影像项目',
      },
      {
        href: 'https://cbai.novetra.tech/',
        title: '柬埔寨商业活跃指数',
        tag: '数据平台',
      },
      {
        href: 'https://cdckh.novetra.tech/',
        title: '柬埔寨发展理事会中文门户',
        tag: '政企门户',
      },
      {
        href: 'https://readyforcambodia.novetra.tech/',
        title: '出海柬埔寨体质测试',
        tag: '互动工具',
      },
      {
        href: 'https://2026amcham.novetra.tech/',
        title: '2026 柬埔寨美国商业展望报告',
        tag: '专题站点',
      },
    ],
    linkGroups: [
      {
        title: '业务领域',
        links: [
          { label: '数字平台开发', href: '#services' },
          { label: '移动应用开发', href: '#services' },
          { label: 'AI 智能系统', href: '#services' },
        ],
      },
      {
        title: '公司',
        links: [
          { label: '关于我们', href: '#about' },
          { label: '我们的优势', href: '#why-us' },
          { label: '联系我们', href: '#contact' },
        ],
      },
    ],
    copyright: '新纬科技 Novetra Tech. All rights reserved.',
    location: '📍 金边，柬埔寨',
  },
};

export const contentSectionLabels: Record<SiteContentSection, string> = {
  brand: '品牌信息',
  nav: '导航栏',
  hero: '首页首屏',
  about: '公司简介',
  services: '业务领域',
  whyUs: '优势与愿景',
  contact: '联系模块',
  footer: '页脚内容',
};

export function mergeSiteContent(input: unknown): SiteContent {
  return mergeValue(defaultSiteContent, input);
}

function mergeValue<T>(fallback: T, value: unknown): T {
  if (Array.isArray(fallback)) {
    return Array.isArray(value) ? (value as T) : fallback;
  }

  if (isRecord(fallback)) {
    const source = isRecord(value) ? value : {};
    const merged = Object.entries(fallback).reduce<Record<string, unknown>>((acc, [key, fallbackValue]) => {
      acc[key] = mergeValue(fallbackValue, source[key]);
      return acc;
    }, {});

    return merged as T;
  }

  return typeof value === typeof fallback ? (value as T) : fallback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
