
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface PortfolioImage {
  src: string;
  label: string;
}

interface PortfolioItem {
  icon: string;
  images?: PortfolioImage[];
  video?: string;
  tags: string[];
  title: string;
  desc: string;
  link1?: string;
  link2?: string;
  ativo?: boolean;
  category?: 'projeto' | 'demo';
}

function isInternalLink(href: string) {
  return href.startsWith('/') && !href.startsWith('//');
}

function PortfolioLink({
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
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

function PortfolioCard({
  item,
  link1Label,
  link2Label,
}: {
  item: PortfolioItem;
  link1Label: string;
  link2Label: string;
}) {
  return (
    <div className="portfolio-card">
      <div className="portfolio-thumb">
        <div className="portfolio-thumb-bg" />

        {item.video ? (
          <div className="portfolio-video-wrapper">
            <video
              src={item.video}
              autoPlay
              loop
              muted
              playsInline
              className="portfolio-video"
            />
          </div>
        ) : item.images && item.images.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            className="portfolio-swiper"
          >
            {item.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="portfolio-slide-wrapper">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="portfolio-slide-img"
                  />

                  <div className="portfolio-slide-label">
                    <span>{img.label}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="portfolio-thumb-icon">
            {item.icon}
          </div>
        )}
      </div>

      <div className="portfolio-body">
        <div className="portfolio-tags">
          {item.tags.map((tag) => (
            <span className="portfolio-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <h3 className="portfolio-title">
          {item.title}
        </h3>

        <p className="portfolio-desc">
          {item.desc}
        </p>

        <div className="portfolio-actions">
          {item.link1 && (
            <PortfolioLink
              href={item.link1}
              className="portfolio-link"
            >
              {link1Label}
            </PortfolioLink>
          )}

          {item.link2 && (
            <PortfolioLink
              href={item.link2}
              className="portfolio-link"
            >
              {link2Label}
            </PortfolioLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { t } = useTranslation();

  const items = t('portfolio.items', {
    returnObjects: true,
  }) as PortfolioItem[];

  const projectItems = items.filter(
    (item) =>
      item.ativo !== false &&
      item.category === 'projeto'
  );

  const demoItems = items.filter(
    (item) =>
      item.ativo !== false &&
      item.category === 'demo'
  );

  return (
    <section className="portfolio" id="portfolio">
      <div className="container">

        {/* HEADER */}
        <div className="section-header">
          <div className="tag">
            ◈ {t('portfolio.tag')}
          </div>

          <h2 className="section-title">
            {t('portfolio.title')}{' '}
            <span>{t('portfolio.title_accent')}</span>
          </h2>

          <p className="section-sub">
            {t('portfolio.sub')}
          </p>
        </div>

        {/* PROJETOS */}
        {projectItems.length > 0 && (
          <div className="portfolio-group">
            <div className="portfolio-group-header">
              <div>
                <h3 className="portfolio-group-title">
                  {t('portfolio.projects.title')}
                </h3>

                <p className="portfolio-group-sub">
                  {t('portfolio.projects.sub')}
                </p>
              </div>
            </div>

            <div className="portfolio-grid">
              {projectItems.map((item) => (
                <PortfolioCard
                  key={item.title}
                  item={item}
                  link1Label={t('portfolio.link1')}
                  link2Label={t('portfolio.link2')}
                />
              ))}
            </div>
          </div>
        )}

        {/* DEMONSTRAÇÕES */}
        {demoItems.length > 0 && (
          <div className="portfolio-group portfolio-demos">
            <div className="portfolio-group-header">
              <div>
                <h3 className="portfolio-group-title">
                  {t('portfolio.demos.title')}
                </h3>

                <p className="portfolio-group-sub">
                  {t('portfolio.demos.sub')}
                </p>
              </div>
            </div>

            <div className="portfolio-grid">
              {demoItems.map((item) => (
                <PortfolioCard
                  key={item.title}
                  item={item}
                  link1Label={t('portfolio.demo_link1')}
                  link2Label={t('')}
                />
              ))}
            </div>

            
          </div>
        )}

      </div>
    </section>
  );
}

