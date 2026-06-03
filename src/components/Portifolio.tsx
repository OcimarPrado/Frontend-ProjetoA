
import { useTranslation } from 'react-i18next';
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
}

export default function Portfolio() {
  const { t } = useTranslation();

  const items = t('portfolio.items', {
    returnObjects: true,
  }) as PortfolioItem[];

  const handleInternalLink = (selector: string) => {
    const element = document.querySelector(selector);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
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

        <div className="portfolio-grid">
          {items
            .filter((item) => item.ativo !== false)
            .map((item) => (
              <div
                className="portfolio-card"
                key={item.title}
              >
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
                  ) : item.images &&
                    item.images.length > 0 ? (
                    <Swiper
                      modules={[
                        Autoplay,
                        Pagination,
                        EffectFade,
                      ]}
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
                      <span
                        className="portfolio-tag"
                        key={tag}
                      >
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
                      <a
                        href={item.link1}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-link"
                      >
                        {t('portfolio.link1')}
                      </a>
                    )}

                    {item.link2 && (
                      <button
                        type="button"
                        className="portfolio-link secondary"
                        onClick={() =>
                          handleInternalLink(
                            item.link2 as string
                          )
                        }
                      >
                        {t('portfolio.link2')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

