import React, { useState } from "react";
import { Link } from "react-scroll";
import "../styles/Header.css";
import ContatoBot from "./ContatoBot"; // 1. Importar o Bot

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false); // 2. Estado para controlar o Bot

  const handleContactClick = () => {
    setIsBotOpen(true);   // Abre o Bot
    setMenuOpen(false);   // Fecha o menu hambúrguer no mobile
  };

  const handleCloseBot = () => {
    setIsBotOpen(false);  // Fecha o Bot
  };

  return (
    <>
      {/* 3. Renderizar o Bot aqui para ele ficar por cima de tudo */}
      <ContatoBot isOpen={isBotOpen} onClose={handleCloseBot} />

      <header className="header">
        <div className="header-container">
          {/* Logo e Slogan */}
          <div className="logo-container">
            <div className="logo-text"><span>Ocyan</span>-Tech</div>
            <div className="slogan">Sites profissionais que geram clientes para o seu negócio</div>
          </div>

          {/* Menu de navegação */}
          <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
            <Link to="inicio" smooth={true} duration={500} className="nav-button" onClick={() => setMenuOpen(false)}>Início</Link>
            <Link to="como-funciona" smooth={true} duration={500} className="nav-button" onClick={() => setMenuOpen(false)}>Sobre nós</Link>
            <Link to="servico" smooth={true} duration={500} className="nav-button" onClick={() => setMenuOpen(false)}>Serviços</Link>
            
            {/* 4. Alterado de <Link> para <span> ou <a> para disparar o Bot */}
            <span className="nav-button" onClick={handleContactClick} style={{cursor: 'pointer'}}>
              Contato
            </span>

            <Link to="planos" smooth={true} duration={500} className="nav-button" onClick={() => setMenuOpen(false)}>Planos</Link>          
            <Link to="planos" smooth={true} duration={500} className="btn-header" onClick={() => setMenuOpen(false)}>Quero meu site</Link>
          </nav>

          {/* Menu hambúrguer para mobile */}
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