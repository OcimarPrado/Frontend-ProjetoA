import { useTranslation } from 'react-i18next';

interface PlanFeature {
  included: boolean;
  text: string;
}

interface Plan {
  name: string;
  icon: string;
  desc: string;
  price_from: string | null;
  price_monthly: string | null;
  price_label: string;
  setup_label: string;
  monthly_label: string;
  note: string;
  featured: boolean;
  features: PlanFeature[];
}

interface PricingData {
  tag: string;
  title: string;
  title_accent: string;
  sub: string;
  featured_badge: string;
  note_setup: string;
  cta: string;
  cta_custom: string;
  plans: Plan[];
}

export default function Pricing() {
  const { t } = useTranslation();

  const pricing = t('pricing', { returnObjects: true }) as PricingData;

  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="section-header">
          <div className="tag">◈ {pricing.tag}</div>

          <h2 className="section-title">
            {pricing.title}
            <span>{pricing.title_accent}</span>
          </h2>

          <p className="section-sub">{pricing.sub}</p>
        </div>

        <div className="pricing-grid">
          {pricing.plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card ${plan.featured ? 'featured' : ''}`}
            >
              {plan.featured && (
                <div className="pricing-badge">{pricing.featured_badge}</div>
              )}

              {/* Nome + Descrição */}
              <div className="pricing-plan">
                <div className="pricing-plan-name">
                  {plan.icon && (
                    <span style={{ marginRight: '0.4rem' }}>{plan.icon}</span>
                  )}
                  {plan.name}
                </div>
                <div className="pricing-plan-desc">{plan.desc}</div>
              </div>

              {/* Bloco de Preço */}
              <div className="pricing-price">

                {plan.price_from ? (
                  /* Card com preço definido — Sites */
                  <>
                    <div className="pricing-amount">
                      <span className="pricing-currency">
                        {plan.price_label}
                      </span>
                      <span className="pricing-value">{plan.price_from}</span>
                      <span className="pricing-period">{plan.setup_label}</span>
                    </div>

                    {plan.monthly_label && (
                      <div style={{ marginTop: '0.4rem' }}>
                        <span className="pricing-period">
                          + {plan.monthly_label}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  /* Card sob consulta — Automações & Sistemas */
                  <div className="pricing-amount">
                    <span
                      className="pricing-value"
                      style={{ fontSize: '1.5rem', letterSpacing: '-0.02em' }}
                    >
                      {plan.price_label}
                    </span>
                  </div>
                )}

                <div className="pricing-note" style={{ marginTop: '0.6rem' }}>
                  {plan.note}
                </div>
              </div>

              {/* Features */}
              <ul className="pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature.text}>
                    {feature.included ? (
                      <span className="check">✓</span>
                    ) : (
                      <span className="x">✕</span>
                    )}
                    <span style={{ opacity: feature.included ? 1 : 0.45 }}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={scrollToContact}
                className={`pricing-cta ${
                  plan.featured ? 'btn-primary' : 'btn-outline'
                }`}
              >
                {plan.price_from ? pricing.cta : pricing.cta_custom}
              </button>
            </div>
          ))}
        </div>

        <div className="pricing-footer-note">{pricing.note_setup}</div>
      </div>
    </section>
  );
}