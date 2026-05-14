import { useTranslation } from 'react-i18next';

interface NavLink {
  label: string;
  href: string;
}

export default function Footer() {
  const { t } = useTranslation();

  const servicesLinks = t('footer.links_services', { returnObjects: true }) as NavLink[];
  const companyLinks  = t('footer.links_company',  { returnObjects: true }) as NavLink[];

  const year = new Date().getFullYear();

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-brand-name">
            {"OC"}<span className="accent">{"YAN"}</span>{"-TECH"}
          </div>
          <p className="footer-brand-desc">{t('footer.brand_desc')}</p>
          <div className="footer-social">
            <a
              href="https://github.com/OcimarPrado"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              {/* GitHub icon via unicode */}
              ⌥
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a
              href="https://wa.me/5551999999999"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              ✆
            </a>
          </div>
        </div>

        {/* Serviços */}
        <div className="footer-col">
          <div className="footer-col-title">{t('footer.col_services')}</div>
          <ul>
            {servicesLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Empresa */}
        <div className="footer-col">
          <div className="footer-col-title">{t('footer.col_company')}</div>
          <ul>
            {companyLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p className="footer-copy">
          {t('footer.copyright').replace('{year}', String(year))}{' '}
          <span>♥</span>{' '}
          {t('footer.copyright_end')}
        </p>
        <div className="footer-legal">
          <a href="#">{t('footer.privacy')}</a>
          <a href="#">{t('footer.terms')}</a>
        </div>
      </div>
    </footer>
  );
}
