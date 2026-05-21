import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface AboutItem {
  icon: string;
  title: string;
  text: string;
}

export default function Sobre() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  // Mapeia os arrays tipados direto do pt.json
  const stats = (t('about.cards', { returnObjects: true }) || []) as AboutItem[];
  const pillars = (t('about.highlights', { returnObjects: true }) || []) as AboutItem[];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-inner">

          {/* LEFT */}
          <div className="about-content">

            <span className="tag">
              ◈ {t('about.tag')}
            </span>

            <h2 className="section-title">
              {t('about.title')}{' '}
              <span>{t('about.title_accent')}</span>
            </h2>

            <p className="section-sub">
              {t('about.text1')}
            </p>

            <p className="about-text">
              {t('about.text2')}
            </p>

            <div className="about-highlights">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="about-highlight">
                  <span className="about-highlight-icon">
                    {pillar.icon}
                  </span>
                  <div className="about-highlight-content">
                    <h4 className="about-highlight-title">
                      {pillar.title}
                    </h4>
                    <p className="about-highlight-text">
                      {pillar.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT */}
          <div className="about-visual">
            {stats.map((stat, idx) => (
              <div key={idx} className="about-card">
                <span className="about-card-icon" style={{ fontSize: '1.25rem' }}>
                  {stat.icon}
                </span>
                <h4 className="about-card-title" style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
                  {stat.title}
                </h4>
                <p className="about-card-text">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}