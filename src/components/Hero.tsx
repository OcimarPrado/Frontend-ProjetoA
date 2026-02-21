import React from "react";
import "../styles/Hero.css";

const Hero: React.FC = () => {
  return (
    <section className="hero" id="inicio">
      <div className="hero-inner">
        <div className="hero-text">
          <h1>
            <span className="highlight">Acelere</span> seu atendimento,{" "}
            <span className="highlight">transforme</span> experiências e{" "}
            <span className="highlight">converta</span> cada interação em
            resultados.
          </h1>

          <p className="hero-description">
            Ajudamos você a se conectar com seus clientes de forma inteligente e
            automatizada — aproximando pessoas, otimizando tempo e gerando
            resultados reais.
          </p>

          <div className="hero-cta">
            <a href="#planos" className="btn-primary">Ver Planos</a>
            <a href="#como-funciona" className="btn-secondary">Como Funciona</a>
          </div>

          <div className="hero-features">
            <div 
              className="feature-badge" 
              tabIndex={0} 
              data-tooltip="Sua empresa nunca dorme. Nosso sistema responde clientes instantaneamente a qualquer hora do dia ou da noite."
            >
              Atendimento 24/7
            </div>

            <div 
              className="feature-badge" 
              tabIndex={0} 
              data-tooltip="Filtre curiosos e foque em quem realmente quer comprar através de perguntas estratégicas automatizadas."
            >
              Qualificação de LEAD
            </div>

            <div 
              className="feature-badge" 
              tabIndex={0} 
              data-tooltip="Em menos de 10 minutos seu link está pronto para ser divulgado e começar a captar clientes."
            >
              Configuração Rápida
            </div>
          </div>
        </div>

        <div className="info-box">
          <h3>Como Sua Empresa Será Atendida</h3>
          <div className="info-steps">
            <div className="info-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <strong>Cadastro rápido</strong>
                <p>Acesse o painel e configure as informações básicas do seu negócio.</p>
              </div>
            </div>
            <div className="info-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <strong>Receba seu link</strong>
                <p>Seu link personalizado pronto para compartilhar com os clientes.</p>
              </div>
            </div>
            <div className="info-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <strong>Conversa estruturada</strong>
                <p>O cliente responde perguntas organizadas que facilitam a demanda.</p>
              </div>
            </div>
            <div className="info-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <strong>Organização automática</strong>
                <p>Receba os contatos já filtrados e prontos para o fechamento.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;