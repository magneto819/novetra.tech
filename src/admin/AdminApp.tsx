import { useEffect, useMemo, useState } from 'react';
import styles from './AdminApp.module.css';
import {
  contentSectionLabels,
  defaultSiteContent,
  mergeSiteContent,
} from '../content/siteContent';
import type { SiteContent, SiteContentSection } from '../content/siteContent';
import {
  ADMIN_EMAIL,
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

export default function AdminApp() {
  const [session, setSession] = useState<AdminSession | null>(() => getStoredAdminSession());
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [activeSection, setActiveSection] = useState<SiteContentSection>('hero');
  const [editorValue, setEditorValue] = useState('');
  const [loginName, setLoginName] = useState(ADMIN_USERNAME);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const activeLabel = contentSectionLabels[activeSection];

  const formattedSection = useMemo(
    () => JSON.stringify(content[activeSection], null, 2),
    [activeSection, content],
  );

  useEffect(() => {
    setEditorValue(formattedSection);
  }, [formattedSection]);

  useEffect(() => {
    fetchSiteContent()
      .then(setContent)
      .catch(() => setContent(defaultSiteContent));
  }, []);

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
      const parsedSection = JSON.parse(editorValue) as SiteContent[SiteContentSection];
      const nextContent = mergeSiteContent({
        ...content,
        [activeSection]: parsedSection,
      });
      const savedContent = await saveSiteContent(nextContent, session);
      setContent(savedContent);
      setStatus(`${activeLabel}已发布。`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存失败，请检查 JSON 格式。');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSection = () => {
    const nextContent = mergeSiteContent({
      ...content,
      [activeSection]: defaultSiteContent[activeSection],
    });

    setContent(nextContent);
    setEditorValue(JSON.stringify(defaultSiteContent[activeSection], null, 2));
    setStatus(`${activeLabel}已恢复为默认内容，点击发布后生效。`);
    setError('');
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
            <h2>使用 Supabase Auth 账号登录</h2>
            <p>
              管理员用户名为 {ADMIN_USERNAME}，绑定邮箱为 {ADMIN_EMAIL}。密码不会写入前端代码，请在 Supabase Auth 中维护。
            </p>
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

            <textarea
              className={styles.editor}
              value={editorValue}
              onChange={(event) => setEditorValue(event.target.value)}
              spellCheck={false}
            />

            <div className={styles.helpBar}>
              <span>可以通过 JSON 数组增加、修改或删除项目；保存后前台会读取最新内容。</span>
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
