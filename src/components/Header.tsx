import React, { useState } from "react";
import { Link } from "react-scroll";
import "../styles/Header.css";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo e Slogan */}
        <div className="logo-container">
          <div className="logo-text"><span>Ocyan</span>-Tech</div>
          <div className="slogan">Atendimento Inteligente Automatizando Resultados</div>
        </div>

        {/* Menu de navegação */}
        <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <Link to="inicio" smooth={true} duration={500} className="nav-button" onClick={() => setMenuOpen(false)}>Início</Link>
          <Link to="como-funciona" smooth={true} duration={500} className="nav-button" onClick={() => setMenuOpen(false)}>Como Funciona</Link>
          <Link to="planos" smooth={true} duration={500} className="nav-button" onClick={() => setMenuOpen(false)}>Planos</Link>
          {/*<Link to="contato" smooth={true} duration={500} className="nav-button" onClick={() => setMenuOpen(false)}>Contato</Link>*/}
          <Link to="planos" smooth={true} duration={500} className="btn-header" onClick={() => setMenuOpen(false)}>Começar Agora</Link>
        </nav>

        {/* Menu hambúrguer para mobile */}
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;