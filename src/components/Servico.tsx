import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ServiceItem {
  number: string;
  icon: string;
  name: string;
  desc: string;
  features: string[];
  link1?: string;
}

/** Mesma regra do Portfolio: link começando com "/" é rota interna
 *  (navegação sem reload via React Router); "http(s)://..." é externo
 *  e abre em nova aba. */
function isInternalLink(href: string) {
  return href.startsWith('/') && !href.startsWith('//');
}

function ServiceLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (isInternalLink(href)) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
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

              {item.link1 && (
                <ServiceLink href={item.link1} className="service-link">
                  {t('services.link1')}
                </ServiceLink>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
