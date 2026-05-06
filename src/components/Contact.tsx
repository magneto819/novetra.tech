import { useState } from 'react';
import styles from './Contact.module.css';
import type { SiteContent } from '../content/siteContent';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

type ContactProps = {
  content: SiteContent['contact'];
};

export default function Contact({ content }: ContactProps) {
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
      if (!res.ok) throw new Error(content.form.errorMessage);
      setSubmitted(true);
    } catch {
      setError(content.form.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.info}>
            <span className="section-label">{content.label}</span>
            <h2 className="section-title">{content.title}</h2>
            <p className={styles.body}>
              {content.body}
            </p>

            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📍</div>
                <div>
                  <div className={styles.contactLabel}>{content.addressLabel}</div>
                  <div className={styles.contactValue}>{content.addressValue}</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📧</div>
                <div>
                  <div className={styles.contactLabel}>{content.emailLabel}</div>
                  <a href={`mailto:${content.email}`} className={styles.contactLink}>
                    {content.email}
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.qrSection}>
              <div className={styles.qrLabel}>{content.qrLabel}</div>
              <div className={styles.qrGrid}>
                {content.qrCards.map((card) => (
                  <div key={card.type} className={styles.qrCard}>
                    <div className={styles.qrBadge} data-type={card.type}>{card.type}</div>
                    <img
                      src={card.imageSrc}
                      alt={card.alt}
                      className={styles.qrImage}
                    />
                    <div className={styles.qrHandle}>{card.handle}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.formWrap}>
            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3>{content.form.successTitle}</h3>
                <p>{content.form.successBody}</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>{content.form.nameLabel}</label>
                    <input
                      name="name"
                      type="text"
                      placeholder={content.form.namePlaceholder}
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label>{content.form.companyLabel}</label>
                    <input
                      name="company"
                      type="text"
                      placeholder={content.form.companyPlaceholder}
                      value={form.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>{content.form.emailLabel}</label>
                  <input
                    name="email"
                    type="email"
                    placeholder={content.form.emailPlaceholder}
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label>{content.form.messageLabel}</label>
                  <textarea
                    name="message"
                    placeholder={content.form.messagePlaceholder}
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                  />
                </div>
                {error && <p className={styles.errorMsg}>{error}</p>}
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? content.form.loadingLabel : content.form.submitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
