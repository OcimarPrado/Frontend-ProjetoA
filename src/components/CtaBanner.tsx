import { useTranslation } from 'react-i18next';

export default function CtaBanner() {
  const { t } = useTranslation();

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="cta-banner">
      <div className="cta-banner-inner">
        <div className="cta-banner-text">
          <h2 className="cta-banner-title">
            {t('cta_banner.title')}
            <span style={{ color: 'var(--teal)' }}>{t('cta_banner.title_accent')}</span>
          </h2>
          <p className="cta-banner-sub">{t('cta_banner.sub')}</p>
        </div>
        <div className="cta-banner-actions">
          <button
            className="btn-orange"
            onClick={() => scrollTo('#contact')}
          >
            {t('cta_banner.cta_primary')} →
          </button>
          <button
            className="btn-outline"
            onClick={() => scrollTo('#pricing')}
          >
            {t('cta_banner.cta_secondary')}
          </button>
        </div>
      </div>
    </section>
  );
}
