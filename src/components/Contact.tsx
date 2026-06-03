import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Method {
  icon: string;
  label: string;
  value: string;
  link?: string;
}

interface FormState {
  name: string;
  email: string;
  service: string;
  message: string;
}

export default function Contact() {
  const { t } = useTranslation();

  const methods = t('contact.methods', { returnObjects: true }) as Method[];
  const options = t('contact.form.service_options', { returnObjects: true }) as string[];

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);

    const WHATSAPP_NUMBER = '5551986730107';

    const text = [
      `Olá! Vim pelo site da Ocyan-Tech 👋`,
      ``,
      `Nome: ${form.name}`,
      `E-mail: ${form.email}`,
      `Serviço: ${form.service || 'Não informado'}`,
      ``,
      `Mensagem:`,
      form.message,
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    await new Promise((r) => setTimeout(r, 500));

    setLoading(false);
    setSent(true);

    window.open(url, '_blank');
  };

  const reset = () => {
    setForm({ name: '', email: '', service: '', message: '' });
    setSent(false);
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-inner">

          {/* INFO */}
          <div className="contact-info">
            <div>
              <div className="tag">◈ {t('contact.tag')}</div>

              <h2 className="section-title">
                {t('contact.title')}
                <span>{t('contact.title_accent')}</span>
              </h2>

              <p className="section-sub">{t('contact.sub')}</p>
            </div>

            <div className="contact-methods">
              {methods.map((m) => (
                <a
                  key={m.label}
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-method"
                >
                  <div className="contact-method-icon">{m.icon}</div>

                  <div className="contact-method-text">
                    <span className="contact-method-label">{m.label}</span>
                    <span className="contact-method-value">{m.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div className="contact-form">
            {sent ? (
              <div className="form-success">
                <div className="form-success-icon">✓</div>
                <div className="form-success-title">
                  {t('contact.form.success_title')}
                </div>
                <div className="form-success-sub">
                  {t('contact.form.success_sub')}
                </div>

                <button className="btn-outline" onClick={reset}>
                  {t('contact.form.success_btn')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>

                <div className="form-row">
                  <div className="form-group">
                    <label>{t('contact.form.name_label')}</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t('contact.form.name_placeholder')}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>{t('contact.form.email_label')}</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t('contact.form.email_placeholder')}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>{t('contact.form.service_label')}</label>

                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                  >
                    <option value="">
                      {t('contact.form.service_placeholder')}
                    </option>

                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>{t('contact.form.message_label')}</label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.message_placeholder')}
                    className="form-textarea"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading
                    ? t('contact.form.submitting')
                    : t('contact.form.submit')}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}