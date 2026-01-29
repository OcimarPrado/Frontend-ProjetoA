import React, { useState } from "react";
import "../styles/Footer.css";
import ContatoBot from "./ContatoBot"; 
// Importe a sua logo aqui (ajuste o caminho se necessário)
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

      <footer className="footer">
        <div className="footer-container">
          
          {/* LOGO DO SITE */}
          <div className="footer-logo">
            <img src={logo} alt="Ocyan Tech Logo" className="footer-img-logo" />
          </div>

          {/* LINKS DE NAVEGAÇÃO AJUSTADOS */}
          <ul className="footer-links">
            <li><a href="#inicio">Início</a></li>
            <li><a href="#como-funciona">Sobre Nós</a></li>
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#planos">Planos</a></li>
            {/* Link de Contato que ativa o Bot */}
            <li>
              <a href="#contato" onClick={handleContactClick}>Contato</a>
            </li>
          </ul>

          <div className="footer-social">
            {/* Seus SVGs de redes sociais permanecem aqui... */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/></svg>
            </a>
            {/* ... outros ícones */}
          </div>

          <div className="footer-contact">
            <p>Email: <a href="mailto:contato@ocyan-tech.com.br">contato@ocyan-tech.com.br</a></p>
          </div>
        </div>

        <hr className="footer-divider" />

        <p className="footer-copy">
          © {new Date().getFullYear()} Ocyan-Tech. Todos os direitos reservados.
        </p>
      </footer>
    </>
  );
};

export default Footer;
