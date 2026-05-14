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
  const highlights = t('about.highlights', { returnObjects: true }) as Highlight[];
  const cards      = t('about.cards',      { returnObjects: true }) as Card[];

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-inner">
          {/* Grid de cards visuais */}
          <div className="about-visual">
            {cards.map((card, i) => (
              <div
                key={card.title}
                className={`about-card${i === 3 ? ' span-2' : ''}`}
              >
                <div className="about-card-icon">{card.icon}</div>
                <div className="about-card-title">{card.title}</div>
                <div className="about-card-text">{card.text}</div>
              </div>
            ))}
          </div>

          {/* Conteúdo textual */}
          <div className="about-content">
            <div>
              <div className="tag">◈ {t('about.tag')}</div>
              <h2 className="section-title">
                {t('about.title')}
                <span>{t('about.title_accent')}</span>
                {t('about.title2')}
              </h2>
            </div>

            <p className="about-text">{t('about.text1')}</p>
            <p className="about-text">{t('about.text2')}</p>

            <div className="about-highlights">
              {highlights.map((h) => (
                <div className="about-highlight" key={h.title}>
                  <span className="about-highlight-icon">{h.icon}</span>
                  <div className="about-highlight-content">
                    <span className="about-highlight-title">{h.title}</span>
                    <span className="about-highlight-text">{h.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
