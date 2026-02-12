import React from "react";
import { motion } from "framer-motion";
import "../styles/Sobre.css";

const steps = [
  { title: "Comunicação Direta", desc: "Conversamos de forma simples e objetiva. Você acompanha o projeto e entende exatamente o que está sendo feito." },
  { title: "Processo Simples", desc: "Trabalho organizado, sem burocracia. Cada etapa existe para entregar um site funcional e eficiente." },
  { title: "Prazos Realistas", desc: "Definimos prazos possíveis e cumprimos o que foi combinado, sem promessas irreais." },
  { title: "Entrega Responsável", desc: "Após a entrega, realizamos ajustes pontuais conforme combinado em contrato." }
];

const Sobre: React.FC = () => {
  return (
    <section className="sobre-section" id="sobre">
      <div className="sobre-header-center animate-on-scroll">
        <span className="overline">CONHEÇA A OCYAN-TECH</span>
        <h2>
          Como Nossa <span>Empresa</span> Trabalha
        </h2>
        <p className="company-bio">
          A Ocyan Tech ajuda empresas a transformar idéias e necessidades em soluções digitais que funcionam de verdade. Criamos sites e sistemas pensados para facilitar processos, melhorar a presença online e gerar resultados práticos no dia a dia do negócio.
        </p>
        <div className="accent-bar"></div>
      </div>

      <div className="steps-horizontal-wrapper">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step-horizontal-card animate-on-scroll ${
              index % 2 === 0 ? "from-left" : "from-right"
            }`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="step-content-dark">
              <div className="step-number-float">{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sobre;