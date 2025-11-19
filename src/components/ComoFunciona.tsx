import React from "react";
import "../styles/ComoFunciona.css";

const steps = [
  {
    title: "📦 Escolha seu Plano",
    description: "Selecione o plano ideal para seu negócio, com funcionalidades adaptadas a sua necessidade.",
  },
  {
    title: "⚙️ Configure o Atendimento",
    description: "Personalize seu chatbot e fluxos de atendimento de forma rápida e intuitiva, sem precisar de programação.",
  },
  {
    title: "💰 Automatize Vendas",
    description: "Atenda seus clientes a qualquer hora! Com o link ocyan-tech/sua_empresa, pedidos, agendamentos e atendimento acontecem automaticamente, 24/7.",
  },
  {
    title: "📊 Acompanhe Resultados",
    description: "Visualize relatórios e dashboards detalhados para tomar decisões rápidas e inteligentes.",
  },
];


const ComoFunciona: React.FC = () => {
  return (
    <section className="como-funciona" id="como-funciona">
      <div className="container">
        <h2>Como Funciona</h2>
        <p className="subtitle">
          Um processo simples e eficiente para automatizar seu atendimento e vendas
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
