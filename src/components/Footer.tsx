import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';


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
            {"NAY"}<span className="accent">{"CO"}</span>{"-TECH"}
          </div>
          <p className="footer-brand-desc">{t('footer.brand_desc')}</p>
          <div className="footer-social">
            <a
            href="https://github.com/OcimarPrado"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub">
              <FaGithub size={24} />
              </a>
              <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
              </a>
            <a
            href="https://wa.me/5551986730108?text=Olá%2c%20vim%20do%20site%20Ocyan-Tech%2c%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20Ocyan-Tech."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            >
              <FaWhatsapp size={24} />
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
          <span>NAYCO-TECH</span>{' '}
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
