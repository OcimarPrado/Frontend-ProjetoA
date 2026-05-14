import { useTranslation } from 'react-i18next';

interface PortfolioItem {
  icon: string;
  tags: string[];
  title: string;
  desc: string;
  link: string;
}

export default function Portfolio() {
  const { t } = useTranslation();
  const items = t('portfolio.items', { returnObjects: true }) as PortfolioItem[];

  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <div className="section-header">
          <div className="tag">◈ {t('portfolio.tag')}</div>
          <h2 className="section-title">
            {t('portfolio.title')}{' '}
            <span>{t('portfolio.title_accent')}</span>
          </h2>
          <p className="section-sub">{t('portfolio.sub')}</p>
        </div>

        <div className="portfolio-grid">
          {items.map((item) => (
            <div className="portfolio-card" key={item.title}>
              <div className="portfolio-thumb">
                <div className="portfolio-thumb-bg" />
                <div className="portfolio-thumb-icon">{item.icon}</div>
              </div>
              <div className="portfolio-body">
                <div className="portfolio-tags">
                  {item.tags.map((tag) => (
                    <span className="portfolio-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <h3 className="portfolio-title">{item.title}</h3>
                <p className="portfolio-desc">{item.desc}</p>
                {item.link !== '#' && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-link"
                  >
                    {t('portfolio.link')}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
