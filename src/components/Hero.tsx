import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />
      </div>

      <div className="hero-inner">
        <div className="hero-content">

          <div className="tag">
            ✦ {t('hero.tag')}
          </div>

          <h1 className="hero-headline">
            {t('hero.headline1')}{' '}
            <span className="teal">
              {t('hero.headline2')}
            </span>
            <span className="line-break">
              {t('hero.headline3')}
            </span>
          </h1>

          <p className="hero-sub">
            {t('hero.sub')}
          </p>

          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => scrollTo('#contact')}
            >
              {t('hero.cta_primary')} →
            </button>

            <button
              className="btn-outline"
              onClick={() => scrollTo('#portfolio')}
            >
              {t('hero.cta_secondary')}
            </button>
          </div>

          {/* DIFERENCIAIS */}
          <div className="hero-stats">

            <div className="hero-stat">
              <div className="hero-stat-title">
                <span className="hero-stat-icon">
                  {t('hero.stat_projects_icon')}
                </span>

                <span>
                  {t('hero.stat_projects_title')}
                </span>
              </div>

              <span className="hero-stat-label">
                {t('hero.stat_projects_label')}
              </span>
            </div>

            <div className="hero-stat">
              <div className="hero-stat-title">
                <span className="hero-stat-icon">
                  {t('hero.stat_uptime_icon')}
                </span>

                <span className="teal">
                  {t('hero.stat_uptime_title')}
                </span>
              </div>

              <span className="hero-stat-label">
                {t('hero.stat_uptime_label')}
              </span>
            </div>

            <div className="hero-stat">
              <div className="hero-stat-title">
                <span className="hero-stat-icon">
                  {t('hero.stat_support_icon')}
                </span>

                <span>
                  {t('hero.stat_support_title')}
                </span>
              </div>

              <span className="hero-stat-label">
                {t('hero.stat_support_label')}
              </span>
            </div>

          </div>
        </div>

        {/* VISUAL */}
        <div className="hero-visual">
          <div
            className="device-mockup"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'flex-end',
            }}
          >

            <div
              className="device-frame"
              style={{
                width: '100%',
              }}
            >

              <div className="device-header">

                <div className="device-dots">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="device-url">
                  <span className="lock">🔒</span>
                  {t('hero.device_url')}
                </div>

              </div>

              <div
                className="device-screenshot"
                style={{
                  position: 'relative',
                  width: '100%',
                  minHeight: '350px',
                  aspectRatio: '16/13',
                  overflow: 'hidden',
                  display: 'block',
                  backgroundColor: '#0b0f17',
                }}
              >

                <img
                  src="/images.jpeg"
                  alt="Demonstração de site desenvolvido pela Nayco"
                  className="device-screenshot-img"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />

              </div>

            </div>

            <a
              href="https://demobarbearia-one.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="device-badge"
              style={{
                textDecoration: 'none',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 3,
              }}
            >

              <div className="device-badge-icon">
                ✅
              </div>

              <div className="device-badge-text">
                <strong>
                  {t('hero.badge_title')}
                </strong>

                <span>
                  {t('hero.badge_text')}
                </span>
              </div>

            </a>

          </div>
        </div>
      </div>
    </section>
  );
}