import React, { useState } from "react";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next"; // Agora o Vite vai achar esse import
import "../styles/Header.css";
import ContatoBot from "./ContatoBot";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setMenuOpen(false);
  };

  return (
    <>
      <ContatoBot isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} />
      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <div className="logo-text"><span>Ocyan</span>-Tech</div>
            <div className="slogan">{t("header.slogan")}</div>
          </div>
          <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
            <Link to="inicio" smooth={true} className="nav-button" onClick={() => setMenuOpen(false)}>{t("header.home")}</Link>
            <Link to="sobre" smooth={true} className="nav-button" onClick={() => setMenuOpen(false)}>{t("header.about")}</Link>
            <Link to="como-funciona" smooth={true} className="nav-button" onClick={() => setMenuOpen(false)}>{t("header.howItWorks")}</Link>
            <Link to="solucao" smooth={true} className="nav-button" onClick={() => setMenuOpen(false)}>{t("header.services")}</Link>
            <Link to="planos" smooth={true} className="nav-button" onClick={() => setMenuOpen(false)}>{t("header.plans")}</Link>
            
            <div className="lang-switcher">
              <button onClick={() => changeLanguage('pt')}>PT</button>
              <button onClick={() => changeLanguage('es')}>ES</button>
              <button onClick={() => changeLanguage('en')}>EN</button>
            </div>

            <button className="btn-header" onClick={() => setIsBotOpen(true)}>{t("header.cta")}</button>
          </nav>
          <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
