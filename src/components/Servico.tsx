import React from "react";
import "../styles/Servico.css";

const Servico: React.FC = () => {
  const servicos = [
    {
      title: "Estrutura de Atendimento",
      desc: "Organizamos o fluxo de entrada de contatos para evitar perda de leads e melhorar o controle comercial.",
      items: [
        "Formulários estruturados",
        "Registro centralizado de contatos",
        "Encaminhamento organizado"
      ],
      icon: "📊",
      ariaLabel: "Serviço de estruturação de atendimento e organização de leads"
    },
    {
      title: "Centralização de Leads",
      desc: "Implementamos sistema simples para visualizar, classificar e acompanhar negociações.",
      items: [
        "Status de atendimento",
        "Histórico de contatos",
        "Controle de negociações"
      ],
      icon: "🗂️",
      ariaLabel: "Serviço de centralização e organização de leads"
    },
    {
      title: "Base para Automação",
      desc: "Criamos a fundação técnica que permite evoluir para automações futuras com segurança.",
      items: [
        "Integração com WhatsApp",
        "Estrutura preparada para IA",
        "Processo escalável"
      ],
      icon: "⚙️",
      ariaLabel: "Serviço de preparação para automação de processos"
    }
  ];

  return (
    <section className="servicos-section" id="solucao" aria-labelledby="servicos-title">
      <div className="container">
        <header className="header-content">
          <span className="top-badge">O QUE ENTREGAMOS</span>
          <h2 id="servicos-title">Estrutura Digital para Organização Comercial</h2>
          <p className="subtitle">
            Sistemas enxutos para organizar atendimento, centralizar leads e criar base para crescimento.
          </p>
        </header>

        <ul className="servicos-grid">
          {servicos.map((s, index) => (
            <li
              className="servico-card"
              key={index}
              aria-label={s.ariaLabel}
            >
              <div className="card-icon" aria-hidden="true">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="card-list">
                {s.items.map((item, i) => (
                  <li key={i}><span>{item}</span></li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="servico-cta-area">
          <a
            href="https://wa.me/5551986730107?text=Olá! Quero organizar meu atendimento e entender como funciona."
            className="btn-main"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com a Ocyan-Tech sobre organização de atendimento"
          >
            Solicitar proposta
          </a>
        </div>
      </div>
    </section>
  );
};

export default Servico;
