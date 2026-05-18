import { useTranslation } from 'react-i18next';

// ── TROQUE pelo caminho da sua screenshot ──────────────────────
// Coloque a imagem em: public/screenshot.png  (ou .jpg/.webp)
// e ajuste o src abaixo:
const SITE_SCREENSHOT = '/screenshot.png';
// ──────────────────────────────────────────────────────────────

export default function Hero() {
  const { t } = useTranslation();

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="hero">
      {/* Fundo decorativo */}
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />
      </div>

      <div className="hero-inner">
        {/* Conteúdo principal */}
        <div className="hero-content">
          <div className="tag">✦ {t('hero.tag')}</div>

          <h1 className="hero-headline">
            {t('hero.headline1')}{' '}
            <span className="teal">{t('hero.headline2')}</span>
            <span className="line-break">{t('hero.headline3')}</span>
          </h1>

          <p className="hero-sub">{t('hero.sub')}</p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo('#contact')}>
              {t('hero.cta_primary')} →
            </button>
            <button className="btn-outline" onClick={() => scrollTo('#portfolio')}>
              {t('hero.cta_secondary')}
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">{t('hero.stat_projects_num')}</span>
              <span className="hero-stat-label">{t('hero.stat_projects_label')}</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">
                <span className="teal">{t('hero.stat_uptime_num')}</span>
              </span>
              <span className="hero-stat-label">{t('hero.stat_uptime_label')}</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">{t('hero.stat_support_num')}</span>
              <span className="hero-stat-label">{t('hero.stat_support_label')}</span>
            </div>
          </div>
        </div>

        {/* Visual mockup com screenshot real */}
        <div className="hero-visual">
          <div className="device-mockup">
            <div className="device-frame">
              {/* Header do browser */}
              <div className="device-header">
                <div className="device-dots">
                  <span /><span /><span />
                </div>
                <div className="device-url">
                  <span className="lock">🔒</span>
                  {t('hero.device_url')}
                </div>
              </div>

              {/* Screenshot real */}
              <div className="device-screenshot">
                <img
                  src={SITE_SCREENSHOT}
                  alt="Site example"
                  className="device-screenshot-img"
                  onError={(e) => {
                    // Fallback: mostra placeholder se imagem não encontrada
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) parent.classList.add('device-screenshot-fallback');
                  }}
                />
              </div>
            </div>

            {/* Badge flutuante - Transformada em LINK */}
            <a 
              href="https://site-psicologia-three.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="device-badge"
              style={{ 
                textDecoration: 'none', 
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div className="device-badge-icon">✅</div>
              <div className="device-badge-text">
                <strong>{t('hero.badge_title') || 'Site no ar!'}</strong>
                <span>Clique e veja o site modelo.</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}