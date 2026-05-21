import { useTranslation } from 'react-i18next';

interface Highlight {
  icon: string;
  title: string;
  text: string;
}

interface Card {
  icon: string;
  title: string;
  text: string;
}

export default function About() {
  const { t } = useTranslation();

  const highlights = t('about.highlights', {
    returnObjects: true,
  }) as Highlight[];

  const cards = t('about.cards', {
    returnObjects: true,
  }) as Card[];

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">

          {/* ESQUERDA */}
          <div className="about-content">
            <div className="tag">
              ◈ {t('about.tag')}
            </div>

            <h2 className="section-title">
              {t('about.title')}
              <span>{t('about.title_accent')}</span>
            </h2>

            <p className="about-text">
              {t('about.text1')}
            </p>

            <p className="about-text">
              {t('about.text2')}
            </p>

            <div className="about-highlights">
              {highlights.map((item) => (
                <div key={item.title} className="about-highlight">
                  <div className="about-highlight-icon">
                    {item.icon}
                  </div>

                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DIREITA */}
          <div className="about-cards">
            {cards.map((card) => (
              <div key={card.title} className="about-card">
                <div className="about-card-icon">
                  {card.icon}
                </div>

                <h3>{card.title}</h3>

                <p>{card.text}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}