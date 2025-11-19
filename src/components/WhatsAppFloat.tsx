import React from "react";
import "../styles/WhatsAppFloat.css";

const WhatsAppFloat: React.FC = () => {
  const numero = "5551986730107";
  const mensagem = "Gostaria de saber mais...";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="WhatsApp"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="Contato WhatsApp"
      />
    </a>
  );
};

export default WhatsAppFloat;
