import { useState } from 'react';
import styles from './Contact.module.css';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('发送失败，请稍后重试。');
      setSubmitted(true);
    } catch {
      setError('发送失败，请稍后重试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.info}>
            <span className="section-label">联系我们</span>
            <h2 className="section-title">开启数字化合作</h2>
            <p className={styles.body}>
              无论您是希望建立全新数字平台，还是对现有系统进行 AI 升级，我们的团队随时准备为您提供专业咨询。
            </p>

            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📍</div>
                <div>
                  <div className={styles.contactLabel}>办公地址</div>
                  <div className={styles.contactValue}>金边，柬埔寨</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📧</div>
                <div>
                  <div className={styles.contactLabel}>电子邮件</div>
                  <a href="mailto:magneto.zhao@gmail.com" className={styles.contactLink}>
                    magneto.zhao@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.qrSection}>
              <div className={styles.qrLabel}>💬 即时通讯 — 扫码添加</div>
              <div className={styles.qrGrid}>
                <div className={styles.qrCard}>
                  <div className={styles.qrBadge} data-type="telegram">Telegram</div>
                  <img
                    src="/image.png"
                    alt="Telegram QR Code"
                    className={styles.qrImage}
                  />
                  <div className={styles.qrHandle}>@SHENGWEIZHAO</div>
                </div>
                <div className={styles.qrCard}>
                  <div className={styles.qrBadge} data-type="wechat">WeChat</div>
                  <img
                    src="/Weixin_Image_20260221115742_1096_56.jpg"
                    alt="WeChat QR Code"
                    className={styles.qrImage}
                  />
                  <div className={styles.qrHandle}>Shengwei</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formWrap}>
            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3>消息已发送！</h3>
                <p>感谢您的联系，我们将在 24 小时内回复您。</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>姓名 *</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="您的姓名"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label>公司名称</label>
                    <input
                      name="company"
                      type="text"
                      placeholder="您的公司（选填）"
                      value={form.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>电子邮件 *</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label>项目需求</label>
                  <textarea
                    name="message"
                    placeholder="请简要描述您的项目需求或问题..."
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                  />
                </div>
                {error && <p className={styles.errorMsg}>{error}</p>}
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? '发送中...' : '发送消息 →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
