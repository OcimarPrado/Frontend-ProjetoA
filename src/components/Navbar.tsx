import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Logo = () => (
  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
    <span style={{ letterSpacing: '-0.02em' }}>
      NAY<span style={{ color: 'var(--teal)' }}>CO</span>
    </span>
    <span className="logo-badge">tech</span>
  </span>
);

type LangToggleProps = {
  mobile?: boolean;
  currentLang: string;
  switchLang: (lang: string) => void;
};

const LangToggle = ({ mobile = false, currentLang, switchLang }: LangToggleProps) => (
  <div
    className={mobile ? undefined : 'lang-toggle'}
    style={mobile ? { display: 'flex', gap: '0.5rem', marginTop: '0.5rem' } : undefined}
  >
    {(['pt', 'en', 'es'] as const).map((lang) => (
      <button
        key={lang}
        className={`lang-btn${currentLang === lang ? ' active' : ''}`}
        onClick={() => switchLang(lang)}
        style={
          mobile
            ? {
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                border: '1px solid var(--border-soft)',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
              }
            : undefined
        }
      >
        {lang.toUpperCase()}
      </button>
    ))}
  </div>
);

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentLang = i18n.language.startsWith('pt')
    ? 'pt'
    : i18n.language.startsWith('es')
    ? 'es'
    : 'en';

  const switchLang = (lang: string) => {
    i18n.changeLanguage(lang);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { key: 'nav.services',  href: '#services'  },
    { key: 'nav.portfolio', href: '#portfolio' },
    { key: 'nav.pricing',   href: '#pricing'   },
    { key: 'nav.about',     href: '#about'     },
    { key: 'nav.contact',   href: '#contact'   },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">
          <a
            href="#"
            className="navbar-logo"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <Logo />
          </a>

          <ul className="navbar-links">
            {links.map((l) => (
              <li key={l.key}>
                <a href={l.href} onClick={(e) => { e.preventDefault(); handleNavClick(l.href); }}>
                  {t(l.key)}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            <LangToggle currentLang={currentLang} switchLang={switchLang} />
            <a
              href="#contact"
              className="btn-primary navbar-cta"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            >
              {t('nav.cta')}
            </a>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map((l) => (
          <a key={l.key} href={l.href} onClick={(e) => { e.preventDefault(); handleNavClick(l.href); }}>
            {t(l.key)}
          </a>
        ))}
        <LangToggle mobile currentLang={currentLang} switchLang={switchLang} />
      </div>
    </>
  );
}

