import React, { useState } from "react";
import { Link } from "react-scroll";
import "../styles/Footer.css";
import ContatoBot from "./ContatoBot"; 
import logo from "../assets/logo_ocyantech.png"; 

const Footer: React.FC = () => {
  const [isBotOpen, setIsBotOpen] = useState(false);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBotOpen(true);
  };
  
  const handleCloseBot = () => {
    setIsBotOpen(false);
  };

  return (
    <>
      <ContatoBot isOpen={isBotOpen} onClose={handleCloseBot} />

      <footer className="footer" role="contentinfo">
        <div className="footer-container">
          
          {/* LOGO DO SITE - Ajustado alt para SEO */}
          <div className="footer-logo">
            <img 
              src={logo} 
              alt="Ocyan Tech - Criação de Sites e Automação" 
              className="footer-img-logo"
              loading="lazy"
            />
          </div>

          {/* LINKS DE NAVEGAÇÃO - Semântica de Menu */}
          <nav aria-label="Navegação do Rodapé">
            <ul className="footer-links">
              <li>
                <Link to="inicio" smooth={true} duration={500} offset={-80} className="footer-nav-item">Início</Link>
              </li>
              <li>
                <Link to="sobre" smooth={true} duration={500} offset={-80} className="footer-nav-item">Sobre Nós</Link>
              </li>
              <li>
                <Link to="servico" smooth={true} duration={500} offset={-80} className="footer-nav-item">Serviços</Link>
              </li>
              <li>
                <Link to="planos" smooth={true} duration={500} offset={-80} className="footer-nav-item">Planos</Link>
              </li>
              <li>
                <button 
                  className="footer-nav-item" 
                  onClick={handleContactClick} 
                  style={{cursor: 'pointer', background: 'none', border: 'none', font: 'inherit'}}
                  aria-label="Abrir chat de contato"
                >
                  Contato
                </button>
              </li>
            </ul>
          </nav>

          {/* REDES SOCIAIS - Adicionado aria-label e title */}
          <div className="footer-social">
            <a 
              href="https://instagram.com/ocyan_tech" // Sugestão: adicione seu user real
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Siga a Ocyan Tech no Instagram"
              title="Instagram Ocyan Tech"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path fill="currentColor" d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/>
              </svg>
            </a>
          </div>

          {/* CONTATO - Reforço de Nome da Marca */}
          <div className="footer-contact">
            <p><strong>Ocyan Tech - Soluções Digitais</strong></p>
            <p>Email: <a href="mailto:contato@ocyan-tech.com.br" title="Enviar e-mail para Ocyan Tech">contato@ocyan-tech.com.br</a></p>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} <strong>Ocyan-Tech</strong>. Todos os direitos reservados.
          </p>
          <p style={{fontSize: '0.8rem', opacity: 0.7, marginTop: '5px'}}>
            Desenvolvimento de Sites, Landing Pages e Automações de Sistemas.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;