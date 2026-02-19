import React from "react";
import "../styles/Sobre.css";

const Sobre: React.FC = () => {
  return (
    <section className="sobre-section" id="sobre">
      <div className="sobre-container">
        <span className="overline">SOBRE A OCYAN-TECH</span>

        <h2>
          Estrutura Digital para <span>Organização e Crescimento</span>
        </h2>

        <p>
          A Ocyan-Tech desenvolve sistemas e estruturas digitais voltadas para organização de atendimento e controle comercial.
          Nosso foco é criar bases sólidas para que empresas não percam contatos, tenham clareza nos processos e mantenham controle sobre negociações.
        </p>

        <p>
          Trabalhamos com soluções enxutas e objetivas. Cada funcionalidade implementada existe para resolver um problema real do negócio,
          seja na captação de leads, no registro de informações ou na organização do fluxo de atendimento.
        </p>

        <p>
          Não vendemos apenas presença online. Construímos estrutura.
          Uma base técnica bem definida permite evoluir, automatizar e escalar com segurança.
        </p>
      </div>
    </section>
  );
};

export default Sobre;

