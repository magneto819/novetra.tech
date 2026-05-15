import { useEffect, useState } from 'react';
import styles from './AdminApp.module.css';
import {
  contentSectionLabels,
  defaultSiteContent,
  mergeSiteContent,
} from '../content/siteContent';
import type {
  FooterLinkGroup,
  NavLink,
  QrCard,
  ReasonCard,
  RelatedSite,
  ServiceCard,
  SiteContent,
  SiteContentSection,
  StatItem,
} from '../content/siteContent';
import {
  ADMIN_USERNAME,
  clearAdminSession,
  fetchSiteContent,
  getStoredAdminSession,
  hasSupabaseConfig,
  saveSiteContent,
  signInAdmin,
} from '../lib/siteContentApi';
import type { AdminSession } from '../lib/siteContentApi';

const sections = Object.keys(contentSectionLabels) as SiteContentSection[];

const blankNavLink: NavLink = { label: '', href: '' };
const blankStat: StatItem = { value: '', label: '' };
const blankService: ServiceCard = {
  id: 'new-service',
  icon: '',
  title: '',
  subtitle: '',
  color: '#0ea5e9',
  items: [''],
};
const blankReason: ReasonCard = { icon: '', title: '', desc: '' };
const blankQrCard: QrCard = { type: '', imageSrc: '', alt: '', handle: '' };
const blankRelatedSite: RelatedSite = { href: '', title: '', tag: '' };
const blankFooterGroup: FooterLinkGroup = { title: '', links: [{ ...blankNavLink }] };

export default function AdminApp() {
  const [session, setSession] = useState<AdminSession | null>(() => getStoredAdminSession());
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [activeSection, setActiveSection] = useState<SiteContentSection>('hero');
  const [loginName, setLoginName] = useState(ADMIN_USERNAME);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const activeLabel = contentSectionLabels[activeSection];

  useEffect(() => {
    fetchSiteContent()
      .then(setContent)
      .catch(() => setContent(defaultSiteContent));
  }, []);

  const updateSection = <K extends SiteContentSection>(section: K, value: SiteContent[K]) => {
    setContent((prev) => ({ ...prev, [section]: value }));
    setStatus('');
    setError('');
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setStatus('');

    try {
      const nextSession = await signInAdmin(loginName.trim().toLowerCase(), password);
      setSession(nextSession);
      setPassword('');
      setStatus('已登录，可以编辑并发布内容。');
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败。');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async () => {
    if (!session) {
      setError('请先登录管理员账号。');
      return;
    }

    setLoading(true);
    setError('');
    setStatus('');

    try {
      const saved = await saveSiteContent(mergeSiteContent(content), session);
      setContent(saved.content);
      setSession(saved.session);
      setStatus(`${activeLabel}已发布。`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存失败，请稍后重试。');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSection = () => {
    updateSection(activeSection, defaultSiteContent[activeSection]);
    setStatus(`${activeLabel}已恢复为默认内容，点击发布后生效。`);
  };

  const handleReload = async () => {
    setLoading(true);
    setError('');
    setStatus('');

    try {
      const nextContent = await fetchSiteContent();
      setContent(nextContent);
      setStatus('已重新读取线上内容。');
    } catch (err) {
      setError(err instanceof Error ? err.message : '读取内容失败。');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setSession(null);
    setStatus('已退出登录。');
  };

  const renderEditor = () => {
    switch (activeSection) {
      case 'brand':
        return (
          <div className={styles.formArea}>
            <Field label="Logo 字母" value={content.brand.logoLetter} onChange={(logoLetter) => updateSection('brand', { ...content.brand, logoLetter })} />
            <Field label="中文名称" value={content.brand.chineseName} onChange={(chineseName) => updateSection('brand', { ...content.brand, chineseName })} />
            <Field label="英文名称" value={content.brand.englishName} onChange={(englishName) => updateSection('brand', { ...content.brand, englishName })} />
            <Field label="品牌标语" value={content.brand.tagline} onChange={(tagline) => updateSection('brand', { ...content.brand, tagline })} />
          </div>
        );
      case 'nav':
        return (
          <div className={styles.formArea}>
            <Field label="按钮文案" value={content.nav.ctaLabel} onChange={(ctaLabel) => updateSection('nav', { ...content.nav, ctaLabel })} />
            <Field label="按钮链接" value={content.nav.ctaHref} onChange={(ctaHref) => updateSection('nav', { ...content.nav, ctaHref })} />
            <NavLinkList
              title="导航链接"
              links={content.nav.links}
              onChange={(links) => updateSection('nav', { ...content.nav, links })}
            />
          </div>
        );
      case 'hero':
        return (
          <div className={styles.formArea}>
            <Field label="徽标文案" value={content.hero.badge} onChange={(badge) => updateSection('hero', { ...content.hero, badge })} />
            <div className={styles.compactGrid}>
              <Field label="主标题上方" value={content.hero.titleTop} onChange={(titleTop) => updateSection('hero', { ...content.hero, titleTop })} />
              <Field label="英文标题" value={content.hero.titleMain} onChange={(titleMain) => updateSection('hero', { ...content.hero, titleMain })} />
              <Field label="强调词" value={content.hero.titleAccent} onChange={(titleAccent) => updateSection('hero', { ...content.hero, titleAccent })} />
            </div>
            <StringListEditor
              title="副标题文案"
              values={content.hero.taglineLines}
              multiline
              onChange={(taglineLines) => updateSection('hero', { ...content.hero, taglineLines })}
            />
            <div className={styles.compactGrid}>
              <Field label="主按钮文案" value={content.hero.primaryCta.label} onChange={(label) => updateSection('hero', { ...content.hero, primaryCta: { ...content.hero.primaryCta, label } })} />
              <Field label="主按钮链接" value={content.hero.primaryCta.href} onChange={(href) => updateSection('hero', { ...content.hero, primaryCta: { ...content.hero.primaryCta, href } })} />
              <Field label="次按钮文案" value={content.hero.secondaryCta.label} onChange={(label) => updateSection('hero', { ...content.hero, secondaryCta: { ...content.hero.secondaryCta, label } })} />
              <Field label="次按钮链接" value={content.hero.secondaryCta.href} onChange={(href) => updateSection('hero', { ...content.hero, secondaryCta: { ...content.hero.secondaryCta, href } })} />
            </div>
            <StatList
              stats={content.hero.stats}
              onChange={(stats) => updateSection('hero', { ...content.hero, stats })}
            />
            <Field label="滚动提示" value={content.hero.scrollHint} onChange={(scrollHint) => updateSection('hero', { ...content.hero, scrollHint })} />
          </div>
        );
      case 'about':
        return (
          <div className={styles.formArea}>
            <Field label="区块标签" value={content.about.label} onChange={(label) => updateSection('about', { ...content.about, label })} />
            <StringListEditor title="标题行" values={content.about.titleLines} onChange={(titleLines) => updateSection('about', { ...content.about, titleLines })} />
            <StringListEditor title="正文段落" values={content.about.paragraphs} multiline onChange={(paragraphs) => updateSection('about', { ...content.about, paragraphs })} />
            <StringListEditor title="标签列表" values={content.about.highlights} onChange={(highlights) => updateSection('about', { ...content.about, highlights })} />
            <StringListEditor title="视觉图标" values={content.about.visualIcons} onChange={(visualIcons) => updateSection('about', { ...content.about, visualIcons })} />
            <div className={styles.compactGrid}>
              <Field label="卡片标签" value={content.about.cardLabel} onChange={(cardLabel) => updateSection('about', { ...content.about, cardLabel })} />
              <Field label="浮动标识" value={content.about.floatingBadge} onChange={(floatingBadge) => updateSection('about', { ...content.about, floatingBadge })} />
            </div>
          </div>
        );
      case 'services':
        return (
          <div className={styles.formArea}>
            <Field label="区块标签" value={content.services.label} onChange={(label) => updateSection('services', { ...content.services, label })} />
            <Field label="区块标题" value={content.services.title} onChange={(title) => updateSection('services', { ...content.services, title })} />
            <Field label="区块说明" value={content.services.subtitle} multiline onChange={(subtitle) => updateSection('services', { ...content.services, subtitle })} />
            <ServiceList
              cards={content.services.cards}
              onChange={(cards) => updateSection('services', { ...content.services, cards })}
            />
          </div>
        );
      case 'whyUs':
        return (
          <div className={styles.formArea}>
            <Field label="区块标签" value={content.whyUs.label} onChange={(label) => updateSection('whyUs', { ...content.whyUs, label })} />
            <Field label="区块标题" value={content.whyUs.title} onChange={(title) => updateSection('whyUs', { ...content.whyUs, title })} />
            <Field label="区块说明" value={content.whyUs.subtitle} multiline onChange={(subtitle) => updateSection('whyUs', { ...content.whyUs, subtitle })} />
            <ReasonList
              reasons={content.whyUs.reasons}
              onChange={(reasons) => updateSection('whyUs', { ...content.whyUs, reasons })}
            />
            <div className={styles.compactGrid}>
              <Field label="愿景图标" value={content.whyUs.visionIcon} onChange={(visionIcon) => updateSection('whyUs', { ...content.whyUs, visionIcon })} />
              <Field label="愿景标签" value={content.whyUs.visionLabel} onChange={(visionLabel) => updateSection('whyUs', { ...content.whyUs, visionLabel })} />
            </div>
            <Field label="愿景内容" value={content.whyUs.visionText} multiline onChange={(visionText) => updateSection('whyUs', { ...content.whyUs, visionText })} />
          </div>
        );
      case 'contact':
        return (
          <div className={styles.formArea}>
            <Field label="区块标签" value={content.contact.label} onChange={(label) => updateSection('contact', { ...content.contact, label })} />
            <Field label="区块标题" value={content.contact.title} onChange={(title) => updateSection('contact', { ...content.contact, title })} />
            <Field label="区块说明" value={content.contact.body} multiline onChange={(body) => updateSection('contact', { ...content.contact, body })} />
            <div className={styles.compactGrid}>
              <Field label="地址标签" value={content.contact.addressLabel} onChange={(addressLabel) => updateSection('contact', { ...content.contact, addressLabel })} />
              <Field label="地址内容" value={content.contact.addressValue} onChange={(addressValue) => updateSection('contact', { ...content.contact, addressValue })} />
              <Field label="邮箱标签" value={content.contact.emailLabel} onChange={(emailLabel) => updateSection('contact', { ...content.contact, emailLabel })} />
              <Field label="邮箱地址" value={content.contact.email} onChange={(email) => updateSection('contact', { ...content.contact, email })} />
            </div>
            <Field label="二维码标题" value={content.contact.qrLabel} onChange={(qrLabel) => updateSection('contact', { ...content.contact, qrLabel })} />
            <QrCardList
              cards={content.contact.qrCards}
              onChange={(qrCards) => updateSection('contact', { ...content.contact, qrCards })}
            />
            <ContactFormFields
              form={content.contact.form}
              onChange={(form) => updateSection('contact', { ...content.contact, form })}
            />
          </div>
        );
      case 'footer':
        return (
          <div className={styles.formArea}>
            <Field label="关联项目标题" value={content.footer.relatedTitle} onChange={(relatedTitle) => updateSection('footer', { ...content.footer, relatedTitle })} />
            <Field label="关联项目说明" value={content.footer.relatedDescription} multiline onChange={(relatedDescription) => updateSection('footer', { ...content.footer, relatedDescription })} />
            <RelatedSiteList
              sites={content.footer.relatedSites}
              onChange={(relatedSites) => updateSection('footer', { ...content.footer, relatedSites })}
            />
            <FooterGroupList
              groups={content.footer.linkGroups}
              onChange={(linkGroups) => updateSection('footer', { ...content.footer, linkGroups })}
            />
            <div className={styles.compactGrid}>
              <Field label="版权文字" value={content.footer.copyright} onChange={(copyright) => updateSection('footer', { ...content.footer, copyright })} />
              <Field label="位置文字" value={content.footer.location} onChange={(location) => updateSection('footer', { ...content.footer, location })} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!hasSupabaseConfig()) {
    return (
      <main className={styles.page}>
        <section className={styles.noticePanel}>
          <p className={styles.kicker}>Novetra Admin</p>
          <h1>后台暂时不可用</h1>
          <p>缺少 `VITE_SUPABASE_URL` 或 `VITE_SUPABASE_ANON_KEY`，请先在环境变量中配置 Supabase。</p>
          <a href="/" className={styles.secondaryButton}>返回前台</a>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Novetra Admin</p>
          <h1>网站内容管理</h1>
        </div>
        <div className={styles.headerActions}>
          <a href="/" className={styles.secondaryButton}>打开前台</a>
          {session && (
            <button type="button" className={styles.secondaryButton} onClick={handleLogout}>
              退出
            </button>
          )}
        </div>
      </header>

      {!session ? (
        <section className={styles.loginPanel}>
          <div>
            <p className={styles.sectionLabel}>管理员登录</p>
            <h2>登录后台</h2>
          </div>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <label>
              用户名或邮箱
              <input
                type="text"
                value={loginName}
                onChange={(event) => setLoginName(event.target.value)}
                required
              />
            </label>
            <label>
              密码
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            <button type="submit" className={styles.primaryButton} disabled={loading}>
              {loading ? '登录中...' : '登录后台'}
            </button>
          </form>
        </section>
      ) : (
        <section className={styles.workspace}>
          <aside className={styles.sidebar}>
            <p className={styles.sectionLabel}>内容区块</p>
            <div className={styles.sectionList}>
              {sections.map((section) => (
                <button
                  key={section}
                  type="button"
                  className={`${styles.sectionButton} ${section === activeSection ? styles.activeSection : ''}`}
                  onClick={() => {
                    setActiveSection(section);
                    setStatus('');
                    setError('');
                  }}
                >
                  {contentSectionLabels[section]}
                </button>
              ))}
            </div>
          </aside>

          <section className={styles.editorPanel}>
            <div className={styles.editorHeader}>
              <div>
                <p className={styles.sectionLabel}>正在编辑</p>
                <h2>{activeLabel}</h2>
              </div>
              <div className={styles.editorActions}>
                <button type="button" className={styles.secondaryButton} onClick={handleReload} disabled={loading}>
                  重新读取
                </button>
                <button type="button" className={styles.secondaryButton} onClick={handleResetSection} disabled={loading}>
                  恢复默认
                </button>
                <button type="button" className={styles.primaryButton} onClick={handleSaveSection} disabled={loading}>
                  {loading ? '处理中...' : '发布当前区块'}
                </button>
              </div>
            </div>

            {renderEditor()}

            <div className={styles.helpBar}>
              <span>通过表单增加、修改或删除内容；保存后前台会读取最新内容。</span>
              <span>当前账号：{session.email}</span>
            </div>
          </section>
        </section>
      )}

      {(error || status) && (
        <div className={`${styles.toast} ${error ? styles.errorToast : styles.statusToast}`}>
          {error || status}
        </div>
      )}
    </main>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  type?: string;
};

function Field({ label, value, onChange, multiline = false, type = 'text' }: FieldProps) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

type StringListEditorProps = {
  title: string;
  values: string[];
  onChange: (values: string[]) => void;
  multiline?: boolean;
};

function StringListEditor({ title, values, onChange, multiline = false }: StringListEditorProps) {
  const updateItem = (index: number, value: string) => {
    onChange(values.map((item, itemIndex) => (itemIndex === index ? value : item)));
  };

  return (
    <section className={styles.listBlock}>
      <div className={styles.listHeader}>
        <h3>{title}</h3>
        <button type="button" className={styles.secondaryButton} onClick={() => onChange([...values, ''])}>
          新增
        </button>
      </div>
      <div className={styles.cardList}>
        {values.map((value, index) => (
          <div key={`${title}-${index}`} className={styles.inlineItem}>
            <Field label={`${title} ${index + 1}`} value={value} multiline={multiline} onChange={(nextValue) => updateItem(index, nextValue)} />
            <button type="button" className={styles.dangerButton} onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))}>
              删除
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function NavLinkList({ title, links, onChange }: { title: string; links: NavLink[]; onChange: (links: NavLink[]) => void }) {
  return (
    <section className={styles.listBlock}>
      <div className={styles.listHeader}>
        <h3>{title}</h3>
        <button type="button" className={styles.secondaryButton} onClick={() => onChange([...links, { ...blankNavLink }])}>
          新增
        </button>
      </div>
      <div className={styles.cardList}>
        {links.map((link, index) => (
          <div key={`${title}-${index}`} className={styles.adminCard}>
            <CardHeader title={`${title} ${index + 1}`} onRemove={() => onChange(links.filter((_, itemIndex) => itemIndex !== index))} />
            <div className={styles.compactGrid}>
              <Field label="文案" value={link.label} onChange={(label) => onChange(updateArrayItem(links, index, { ...link, label }))} />
              <Field label="链接" value={link.href} onChange={(href) => onChange(updateArrayItem(links, index, { ...link, href }))} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatList({ stats, onChange }: { stats: StatItem[]; onChange: (stats: StatItem[]) => void }) {
  return (
    <section className={styles.listBlock}>
      <div className={styles.listHeader}>
        <h3>统计数据</h3>
        <button type="button" className={styles.secondaryButton} onClick={() => onChange([...stats, { ...blankStat }])}>
          新增
        </button>
      </div>
      <div className={styles.cardList}>
        {stats.map((stat, index) => (
          <div key={`stat-${index}`} className={styles.adminCard}>
            <CardHeader title={`统计 ${index + 1}`} onRemove={() => onChange(stats.filter((_, itemIndex) => itemIndex !== index))} />
            <div className={styles.compactGrid}>
              <Field label="数值" value={stat.value} onChange={(value) => onChange(updateArrayItem(stats, index, { ...stat, value }))} />
              <Field label="说明" value={stat.label} onChange={(label) => onChange(updateArrayItem(stats, index, { ...stat, label }))} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServiceList({ cards, onChange }: { cards: ServiceCard[]; onChange: (cards: ServiceCard[]) => void }) {
  return (
    <section className={styles.listBlock}>
      <div className={styles.listHeader}>
        <h3>服务卡片</h3>
        <button type="button" className={styles.secondaryButton} onClick={() => onChange([...cards, { ...blankService, id: `service-${Date.now()}` }])}>
          新增服务
        </button>
      </div>
      <div className={styles.cardList}>
        {cards.map((card, index) => (
          <div key={card.id || index} className={styles.adminCard}>
            <CardHeader title={card.title || `服务 ${index + 1}`} onRemove={() => onChange(cards.filter((_, itemIndex) => itemIndex !== index))} />
            <div className={styles.compactGrid}>
              <Field label="唯一 ID" value={card.id} onChange={(id) => onChange(updateArrayItem(cards, index, { ...card, id }))} />
              <Field label="图标" value={card.icon} onChange={(icon) => onChange(updateArrayItem(cards, index, { ...card, icon }))} />
              <Field label="标题" value={card.title} onChange={(title) => onChange(updateArrayItem(cards, index, { ...card, title }))} />
              <Field label="英文副标题" value={card.subtitle} onChange={(subtitle) => onChange(updateArrayItem(cards, index, { ...card, subtitle }))} />
              <Field label="强调色" value={card.color} type="color" onChange={(color) => onChange(updateArrayItem(cards, index, { ...card, color }))} />
            </div>
            <StringListEditor
              title="服务条目"
              values={card.items}
              onChange={(items) => onChange(updateArrayItem(cards, index, { ...card, items }))}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function ReasonList({ reasons, onChange }: { reasons: ReasonCard[]; onChange: (reasons: ReasonCard[]) => void }) {
  return (
    <section className={styles.listBlock}>
      <div className={styles.listHeader}>
        <h3>优势卡片</h3>
        <button type="button" className={styles.secondaryButton} onClick={() => onChange([...reasons, { ...blankReason }])}>
          新增优势
        </button>
      </div>
      <div className={styles.cardList}>
        {reasons.map((reason, index) => (
          <div key={`${reason.title}-${index}`} className={styles.adminCard}>
            <CardHeader title={reason.title || `优势 ${index + 1}`} onRemove={() => onChange(reasons.filter((_, itemIndex) => itemIndex !== index))} />
            <div className={styles.compactGrid}>
              <Field label="图标" value={reason.icon} onChange={(icon) => onChange(updateArrayItem(reasons, index, { ...reason, icon }))} />
              <Field label="标题" value={reason.title} onChange={(title) => onChange(updateArrayItem(reasons, index, { ...reason, title }))} />
            </div>
            <Field label="说明" value={reason.desc} multiline onChange={(desc) => onChange(updateArrayItem(reasons, index, { ...reason, desc }))} />
          </div>
        ))}
      </div>
    </section>
  );
}

function QrCardList({ cards, onChange }: { cards: QrCard[]; onChange: (cards: QrCard[]) => void }) {
  return (
    <section className={styles.listBlock}>
      <div className={styles.listHeader}>
        <h3>二维码卡片</h3>
        <button type="button" className={styles.secondaryButton} onClick={() => onChange([...cards, { ...blankQrCard }])}>
          新增二维码
        </button>
      </div>
      <div className={styles.cardList}>
        {cards.map((card, index) => (
          <div key={`${card.type}-${index}`} className={styles.adminCard}>
            <CardHeader title={card.type || `二维码 ${index + 1}`} onRemove={() => onChange(cards.filter((_, itemIndex) => itemIndex !== index))} />
            <div className={styles.compactGrid}>
              <Field label="类型" value={card.type} onChange={(type) => onChange(updateArrayItem(cards, index, { ...card, type }))} />
              <Field label="图片路径" value={card.imageSrc} onChange={(imageSrc) => onChange(updateArrayItem(cards, index, { ...card, imageSrc }))} />
              <Field label="图片说明" value={card.alt} onChange={(alt) => onChange(updateArrayItem(cards, index, { ...card, alt }))} />
              <Field label="账号文字" value={card.handle} onChange={(handle) => onChange(updateArrayItem(cards, index, { ...card, handle }))} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactFormFields({ form, onChange }: { form: SiteContent['contact']['form']; onChange: (form: SiteContent['contact']['form']) => void }) {
  return (
    <section className={styles.listBlock}>
      <div className={styles.listHeader}>
        <h3>表单文案</h3>
      </div>
      <div className={styles.compactGrid}>
        <Field label="姓名标签" value={form.nameLabel} onChange={(nameLabel) => onChange({ ...form, nameLabel })} />
        <Field label="姓名占位符" value={form.namePlaceholder} onChange={(namePlaceholder) => onChange({ ...form, namePlaceholder })} />
        <Field label="公司标签" value={form.companyLabel} onChange={(companyLabel) => onChange({ ...form, companyLabel })} />
        <Field label="公司占位符" value={form.companyPlaceholder} onChange={(companyPlaceholder) => onChange({ ...form, companyPlaceholder })} />
        <Field label="邮箱标签" value={form.emailLabel} onChange={(emailLabel) => onChange({ ...form, emailLabel })} />
        <Field label="邮箱占位符" value={form.emailPlaceholder} onChange={(emailPlaceholder) => onChange({ ...form, emailPlaceholder })} />
        <Field label="需求标签" value={form.messageLabel} onChange={(messageLabel) => onChange({ ...form, messageLabel })} />
        <Field label="提交按钮" value={form.submitLabel} onChange={(submitLabel) => onChange({ ...form, submitLabel })} />
        <Field label="加载文案" value={form.loadingLabel} onChange={(loadingLabel) => onChange({ ...form, loadingLabel })} />
        <Field label="错误文案" value={form.errorMessage} onChange={(errorMessage) => onChange({ ...form, errorMessage })} />
        <Field label="成功标题" value={form.successTitle} onChange={(successTitle) => onChange({ ...form, successTitle })} />
        <Field label="成功正文" value={form.successBody} onChange={(successBody) => onChange({ ...form, successBody })} />
      </div>
      <Field label="需求占位符" value={form.messagePlaceholder} multiline onChange={(messagePlaceholder) => onChange({ ...form, messagePlaceholder })} />
    </section>
  );
}

function RelatedSiteList({ sites, onChange }: { sites: RelatedSite[]; onChange: (sites: RelatedSite[]) => void }) {
  return (
    <section className={styles.listBlock}>
      <div className={styles.listHeader}>
        <h3>关联网站和项目</h3>
        <button type="button" className={styles.secondaryButton} onClick={() => onChange([...sites, { ...blankRelatedSite }])}>
          新增项目
        </button>
      </div>
      <div className={styles.cardList}>
        {sites.map((site, index) => (
          <div key={`${site.href}-${index}`} className={styles.adminCard}>
            <CardHeader title={site.title || `项目 ${index + 1}`} onRemove={() => onChange(sites.filter((_, itemIndex) => itemIndex !== index))} />
            <div className={styles.compactGrid}>
              <Field label="标签" value={site.tag} onChange={(tag) => onChange(updateArrayItem(sites, index, { ...site, tag }))} />
              <Field label="标题" value={site.title} onChange={(title) => onChange(updateArrayItem(sites, index, { ...site, title }))} />
              <Field label="链接" value={site.href} onChange={(href) => onChange(updateArrayItem(sites, index, { ...site, href }))} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FooterGroupList({ groups, onChange }: { groups: FooterLinkGroup[]; onChange: (groups: FooterLinkGroup[]) => void }) {
  return (
    <section className={styles.listBlock}>
      <div className={styles.listHeader}>
        <h3>页脚链接分组</h3>
        <button type="button" className={styles.secondaryButton} onClick={() => onChange([...groups, { ...blankFooterGroup, links: [{ ...blankNavLink }] }])}>
          新增分组
        </button>
      </div>
      <div className={styles.cardList}>
        {groups.map((group, index) => (
          <div key={`${group.title}-${index}`} className={styles.adminCard}>
            <CardHeader title={group.title || `分组 ${index + 1}`} onRemove={() => onChange(groups.filter((_, itemIndex) => itemIndex !== index))} />
            <Field label="分组标题" value={group.title} onChange={(title) => onChange(updateArrayItem(groups, index, { ...group, title }))} />
            <NavLinkList
              title="分组链接"
              links={group.links}
              onChange={(links) => onChange(updateArrayItem(groups, index, { ...group, links }))}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function CardHeader({ title, onRemove }: { title: string; onRemove: () => void }) {
  return (
    <div className={styles.cardHeader}>
      <h4>{title}</h4>
      <button type="button" className={styles.dangerButton} onClick={onRemove}>
        删除
      </button>
    </div>
  );
}

function updateArrayItem<T>(items: T[], index: number, value: T) {
  return items.map((item, itemIndex) => (itemIndex === index ? value : item));
}
