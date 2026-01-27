// src/components/Planos.tsx
import React from "react";
import "../styles/Planos.css";

const WHATSAPP_NUMBER = "5551986730107";

const planos = [
  {
    nome: "Site Profissional",
    descricao: [
      "Site institucional sob medida",
      "Design profissional e responsivo",
      "Foco em credibilidade e presença digital",
      "Entrega rápida e personalizada",
    ],
    mensagem: "Olá! Tenho interesse no plano de Site Profissional e gostaria de entender como funciona.",
    destaque: true,
  },
  {
    nome: "Site + Manutenção",
    descricao: [
      "Site profissional personalizado",
      "Hospedagem inclusa",
      "Manutenção mensal",
      "Suporte técnico contínuo",
    ],
    mensagem: "Olá! Tenho interesse no plano Site + Manutenção. Podemos conversar?",
    destaque: false,
  },
  {
    nome: "Site + Automação",
    descricao: [
      "Site profissional",
      "Integração com automação",
      "Agendamentos e fluxos inteligentes",
      "Projeto sob demanda",
    ],
    mensagem: "Olá! Quero saber mais sobre o plano Site + Automação.",
    destaque: false,
  },
];

const Planos: React.FC = () => {
  const gerarLinkWhats = (mensagem: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
  };

  return (
    <section className="planos" id="planos">
      <div className="container">
        <h2>Planos de Serviço</h2>
        <p className="subtitle">
          Soluções claras, profissionais e adaptadas ao seu negócio
        </p>

        <div className="planos-container">
          {planos.map((plano) => (
            <div
              key={plano.nome}
              className={`plano-card ${plano.destaque ? "destaque" : ""}`}
            >
              <h3>{plano.nome}</h3>

              <ul>
                {plano.descricao.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <a
                href={gerarLinkWhats(plano.mensagem)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-plano"
              >
                Falar no WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Planos;
