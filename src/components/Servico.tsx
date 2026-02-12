import React from "react";
import "../styles/Servico.css";

const Servico: React.FC = () => {
  const servicos = [
    {
      title: "Sites Profissionais",
      desc: "Sites institucionais modernos e responsivos, focados em gerar credibilidade imediata.",
      items: ["Design Exclusivo", "Foco em Conversão", "Mobile First"],
      icon: "🌐",
      ariaLabel: "Serviço de criação de sites profissionais"
    },
    {
      title: "Hospedagem & Tech",
      desc: "Cuidamos de toda a parte técnica para você focar apenas no seu negócio.",
      items: ["Suporte Contínuo", "Segurança Ativa", "Manutenção Mensal"],
      icon: "🛡️",
      ariaLabel: "Serviço de hospedagem e manutenção técnica"
    },
    {
      title: "Automação Essencial",
      desc: "Automatizamos tarefas simples para organizar processos e reduzir trabalho manual.",
      items: [
        "Formulários com envio automático",
        "Integração com WhatsApp ou e-mail",
        "Organização de dados em planilhas"
      ],
      icon: "⚙️",
      ariaLabel: "Serviço de automação de processos e integrações"
    }
  ];

  return (
    <section className="servicos-section" id="servico" aria-labelledby="servicos-title">
      <div className="container">
        <header className="header-content">
          <span className="top-badge">O QUE FAZEMOS</span>
          <h2 id="servicos-title">Nossas Soluções Digitais</h2>
          <p className="subtitle">
            Presença digital profissional, inteligente e pronta para escalar seu negócio.
          </p>
        </header>

        {/* Alterado de div para ul para melhor semântica de lista de serviços */}
        <ul className="servicos-grid">
          {servicos.map((s, index) => (
            <li 
              className="servico-card" 
              key={index} 
              style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}
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
              <div className="card-bg-effect"></div>
            </li>
          ))}
        </ul>

        <div className="servico-cta-area">
          <a
            href="https://wa.me/5551986730107?text=Olá! Quero um orçamento para soluções digitais."
            className="btn-main"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com a Ocyan-Tech sobre orçamento no WhatsApp"
          >
            Falar com a Ocyan-Tech
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Servico;