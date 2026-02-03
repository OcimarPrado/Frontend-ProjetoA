import React, { useState } from "react";
import { Link } from "react-scroll";
import "../styles/Header.css";
import ContatoBot from "./ContatoBot";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);

  const handleContactClick = () => {
    setIsBotOpen(true);
    setMenuOpen(false);
  };

  const handleCloseBot = () => {
    setIsBotOpen(false);
  };

  return (
    <>
      <ContatoBot isOpen={isBotOpen} onClose={handleCloseBot} />

      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <div className="logo-text"><span>Ocyan</span>-Tech</div>
            <div className="slogan">Sites inteligentes automatizando resultados!</div>
          </div>

          <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
            <Link to="inicio" smooth={true} duration={500} className="nav-button" onClick={() => setMenuOpen(false)}>Início</Link>
            <Link to="sobre" smooth={true} duration={500} className="nav-button" onClick={() => setMenuOpen(false)}>Sobre nós</Link>
            <Link to="servico" smooth={true} duration={500} className="nav-button" onClick={() => setMenuOpen(false)}>Serviços</Link>
            {/* AJUSTADO: Classe específica para o botão azul */}
            <span className="nav-button" onClick={handleContactClick}>
              Contato
            </span>

            <Link to="planos" smooth={true} duration={500} className="nav-button" onClick={() => setMenuOpen(false)}>Planos</Link>          
            <Link to="planos" smooth={true} duration={500} className="btn-header" onClick={() => setMenuOpen(false)}>Quero meu site</Link>
          </nav>

          <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
