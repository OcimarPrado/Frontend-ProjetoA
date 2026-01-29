import React from "react";
import "../styles/Sobre.css";

const steps = [
  {
    title: "Comunicação Clara",
    description:
      "Todo o processo é alinhado desde o início, com comunicação objetiva e sem termos técnicos desnecessários.",
  },
  {
    title: "Processo Organizado",
    description:
      "Seguimos um método definido para evitar retrabalho, atrasos e decisões improvisadas durante o projeto.",
  },
  {
    title: "Prazos Definidos",
    description:
      "Cada etapa possui prazos claros, garantindo previsibilidade e segurança até a entrega final.",
  },
  {
    title: "Tranquilidade Após a Entrega",
    description:
      "Mesmo após o projeto concluído, permanecemos disponíveis para suporte, ajustes e orientações.",
  },
];

const Sobre: React.FC = () => {
  return (
    <section className="sobre" id="sobre">
      <div className="container">
        <h2>Nosso Método de Trabalho</h2>
        <p className="subtitle">
          Transparência, organização e prazos claros em todas as etapas do projeto.
        </p>

        <div className="steps">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <h3>{`${index + 1}. ${step.title}`}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sobre;
