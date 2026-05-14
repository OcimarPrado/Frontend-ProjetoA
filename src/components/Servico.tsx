import { useTranslation } from 'react-i18next';

interface ServiceItem {
  number: string;
  icon: string;
  name: string;
  desc: string;
  features: string[];
}

export default function Services() {
  const { t } = useTranslation();
  const items = t('services.items', { returnObjects: true }) as ServiceItem[];

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header">
          <div className="tag">◈ {t('services.tag')}</div>
          <h2 className="section-title">
            {t('services.title')}{' '}
            <span>{t('services.title_accent')}</span>
          </h2>
          <p className="section-sub">{t('services.sub')}</p>
        </div>

        <div className="services-grid">
          {items.map((item) => (
            <div className="service-card" key={item.number}>
              <span className="service-number">// {item.number}</span>
              <div className="service-icon">{item.icon}</div>
              <h3 className="service-name">{item.name}</h3>
              <p className="service-desc">{item.desc}</p>
              <ul className="service-features">
                {item.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
