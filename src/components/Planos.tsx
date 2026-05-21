import { useTranslation } from 'react-i18next';

interface PlanFeature {
  included: boolean;
  text: string;
}

interface Plan {
  name: string;
  desc: string;
  price: string;
  period: string;
  note: string;
  featured: boolean;
  features: PlanFeature[];
}

export default function Pricing() {
  const { t } = useTranslation();
  const plans = t('pricing', { returnObjects: true }) as Plan[];

  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="section-header">
          <div className="tag">◈ {t('pricing.tag')}</div>
          <h2 className="section-title">
            {t('pricing.title')}
            <span>{t('pricing.title_accent')}</span>
          </h2>
          <p className="section-sub">{t('pricing.sub')}</p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card${plan.featured ? ' featured' : ''}`}
            >
              {plan.featured && (
                <div className="pricing-badge">{t('pricing.featured_badge')}</div>
              )}

              <div className="pricing-plan">
                <div className="pricing-plan-name">{plan.name}</div>
                <div className="pricing-plan-desc">{plan.desc}</div>
              </div>

              <div className="pricing-price">
                <div className="pricing-amount">
                  {plan.price !== '?' && (
                    <span className="pricing-currency">R$</span>
                  )}
                  <span className="pricing-value">{plan.price}</span>
                  <span className="pricing-period">{plan.period}</span>
                </div>
                <div className="pricing-note">{plan.note}</div>
              </div>

              <ul className="pricing-features">
                {plan.features.map((f) => (
                  <li key={f.text}>
                    {f.included
                      ? <span className="check">✓</span>
                      : <span className="x">✕</span>
                    }
                    <span style={{ opacity: f.included ? 1 : 0.4 }}>{f.text}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className={`pricing-cta ${plan.featured ? 'btn-primary' : 'btn-outline'}`}
              >
                {plan.price === '?' ? t('pricing.cta_custom') : t('pricing.cta')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
