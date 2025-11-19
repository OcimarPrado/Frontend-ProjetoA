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
        <div className="footer-contact">
          <p>Email: <a href="mailto:contato@ocyan-tech.com.br">contato@ocyan-tech.com.br</a></p>
          </div>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} Ocyan-Tech. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
