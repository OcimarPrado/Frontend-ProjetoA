import React, { useState } from "react";
import { Link } from "react-scroll";
import "../styles/Header.css";
import ContatoBot from "./ContatoBot";
//import logo from "../assets/logo_ocyantech.png";



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
            <div className="logo-text">
              {/*<img src={logo} alt="" className="logo-img"/>*/}
              <span>Ocyan</span>-Tech</div>
              <div className="slogan">Atendimento Inteligente Automatizando Resultados</div>
              </div>
              <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>

            <Link
              to="inicio"
              smooth={true}
              duration={500}
              offset={-90}
              className="nav-button"
              onClick={() => setMenuOpen(false)}
            >
              Início
            </Link>

            <Link
              to="sobre"
              smooth={true}
              duration={500}
              offset={-90}
              className="nav-button"
              onClick={() => setMenuOpen(false)}
            >
              Sobre
            </Link>
            
            <Link
              to="como-funciona"
              smooth={true}
              duration={500}
              offset={-90}
              className="nav-button"
              onClick={() => setMenuOpen(false)}
            >
              Como funciona
            </Link>

            <Link
              to="solucao"
              smooth={true}
              duration={500}
              offset={-90}
              className="nav-button"
              onClick={() => setMenuOpen(false)}
            >
              Serviço
            </Link>

            

            <Link
              to="planos"
              smooth={true}
              duration={500}
              offset={-90}
              className="nav-button"
              onClick={() => setMenuOpen(false)}
            >
              Planos
            </Link>

            <span
              className="nav-button"
              onClick={handleContactClick}
            >
              Contato
            </span>

            <button
              className="btn-header"
              onClick={handleContactClick}
            >
              Solicitar proposta
            </button>

          </nav>

          <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
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
