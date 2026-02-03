import React from "react";
import "../styles/Servico.css";

const Servico: React.FC = () => {
  const servico = [
    {
      title: "Sites Profissionais",
      desc: "Sites institucionais modernos e responsivos, focados em gerar credibilidade imediata.",
      items: ["Design Exclusivo", "Foco em Conversão", "Mobile First"],
      icon: "🌐"
    },
    {
      title: "Hospedagem & Tech",
      desc: "Cuidamos de toda a parte técnica para você focar apenas no seu negócio.",
      items: ["Suporte Contínuo", "Segurança Ativa", "Manutenção Mensal"],
      icon: "🛡️"
    },
    
    {
  title: "Automação Essencial",
  desc: "Automatizamos tarefas simples para organizar processos e reduzir trabalho manual.",
  items: [
    "Formulários com envio automático",
    "Integração com WhatsApp ou e-mail",
    "Organização de dados em planilhas"
  ],
  icon: "⚙️"
}

  ];

  return (
    <section className="servicos-section" id="servico">
      
      <div className="container">
        <div className="header-content">
          <span className="top-badge">O QUE FAZEMOS</span>
          <h2>Nossas Soluções Digitais</h2>
          <p className="subtitle">
            Presença digital profissional, inteligente e pronta para escalar seu negócio.
          </p>
        </div>

        <div className="servicos-grid">
          {servico.map((s, index) => (
            <div className="servico-card" key={index} style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}>
              <div className="card-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="card-list">
                {s.items.map((item, i) => (
                  <li key={i}><span>{item}</span></li>
                ))}
              </ul>
              <div className="card-bg-effect"></div>
            </div>
          ))}
        </div>

        <div className="servico-cta-area">
          <a
            href="https://wa.me/5551986730107?text=Quero um orçamento!"
            className="btn-main"
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar com a Ocyan-Tech
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Servico;