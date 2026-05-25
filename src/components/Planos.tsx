import { useTranslation } from 'react-i18next';

interface PlanFeature {
  included: boolean;
  text: string;
}

interface Plan {
  name: string;
  desc: string;
  price_setup: string;        // Novo campo
  price_monthly: string;      // Novo campo
  setup_label: string;        // Novo campo
  monthly_label: string;      // Novo campo
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

  const pricing = t('pricing', {
    returnObjects: true,
  }) as PricingData;

  const scrollToContact = () =>
    document
      .querySelector('#contact')
      ?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="section-header">
          <div className="tag">
            ◈ {pricing.tag}
          </div>

          <h2 className="section-title">
            {pricing.title}
            <span>{pricing.title_accent}</span>
          </h2>

          <p className="section-sub">
            {pricing.sub}
          </p>
        </div>

        <div className="pricing-grid">
          {pricing.plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card ${
                plan.featured ? 'featured' : ''
              }`}
            >
              {plan.featured && (
                <div className="pricing-badge">
                  {pricing.featured_badge}
                </div>
              )}

              <div className="pricing-plan">
                <div className="pricing-plan-name">
                  {plan.name}
                </div>

                <div className="pricing-plan-desc">
                  {plan.desc}
                </div>
              </div>

              {/* Bloco de Preço Otimizado */}
              <div className="pricing-price">
                <div className="pricing-amount-block">
                  
                  {/* renderização do SETUP (Taxa Única) */}
                  <div className="pricing-setup">
                    {plan.price_setup !== '?' && (
                      <span className="pricing-currency">R$</span>
                    )}
                    <span className="pricing-value-setup">
                      {plan.price_setup}
                    </span>
                    <span className="pricing-label-setup">
                      {plan.setup_label}
                    </span>
                  </div>

                  {/* Renderização do MENSAL (Recorrência) - Esconde se não houver monthly_label */}
                  {plan.monthly_label && (
                    <div className="pricing-monthly">
                      <span className="pricing-value-monthly">
                        + R$ {plan.price_monthly}
                      </span>
                      <span className="pricing-label-monthly">
                        {plan.monthly_label}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pricing-note">
                  {plan.note}
                </div>
              </div>

              <ul className="pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature.text}>
                    {feature.included ? (
                      <span className="check">✓</span>
                    ) : (
                      <span className="x">✕</span>
                    )}

                    <span
                      style={{
                        opacity: feature.included ? 1 : 0.45,
                      }}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className={`pricing-cta ${
                  plan.featured
                    ? 'btn-primary'
                    : 'btn-outline'
                }`}
              >
                {plan.price_setup === '?'
                  ? pricing.cta_custom
                  : pricing.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="pricing-footer-note">
          {pricing.note_setup}
        </div>
      </div>
    </section>
  );
}