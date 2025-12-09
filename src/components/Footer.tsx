import React from "react";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <h2>Ocyan-Tech</h2>

        <ul className="footer-links">
          <li><a href="#inicio">Início</a></li>
          <li><a href="#como-funciona">Como Funciona</a></li>
          <li><a href="#planos">Planos</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>

        <div className="footer-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24">
              <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 
              1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 
              000-10zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/>
            </svg>
          </a>

          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 
              1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.3 
              0-1.7.8-1.7 1.6V12H18l-.4 3h-3v7A10 10 0 0022 12z"/>
            </svg>
          </a>

          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24">
              <path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 
              010-5zM3 8.98h4v12H3v-12zm7 0h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 
              3.9 0 4.7 2.5 4.7 5.8v6.4h-4v-5.7c0-1.4 0-3.3-2-3.3-2 0-2.3 
              1.5-2.3 3.2v5.8h-4v-12z"/>
            </svg>
          </a>
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
  );
};

export default Footer;
