import React, { useState } from "react";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next"; // Agora o Vite vai achar esse import
import "../styles/ComoFunciona.css";


const steps = [
  {
    title: "Nós Ouvimos Você",
    description: "Através de reuniões planejadas, entendemos sua necessidade e como nossos serviços podem atender á sua demanda.",
  },
  {
    title: "Planejamento Estratégico",
    description: "Com clareza dos objetivos, planejamos as etapas de produção e entregas parcias para feedback e ajustes.",
  },
  {
    title: "Comunicação Ativa",
    description: "Mantemos uma linha de comunicação aberta e ativa durante todo o processo, maximizando resultados e minimizando a necessidade de ajustes pós entrega.",
  },
  {
    title: "Pós entrega",
    description: "Fornecemos treinamento e acompanhamento para equipes, dando suporte contínuo e programado após entrega do Software, API ou site.",
  },
];


const ComoFunciona: React.FC = () => {
  return (
    <section className="como-funciona" id="como-funciona">
      <div className="container">
        <h2>Como trabalhamos na Ocyan-Tech?</h2>
        <p className="subtitle">
          Um processo simples e eficiente para ajudar sua empresa a crescer.
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

export default ComoFunciona;
