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
            <span className="highlight">converta</span> cada interação em resultados.
          </h1>

          <p className="hero-description">
            Ajudamos você a se conectar com seus clientes de forma inteligente e automatizada — aproximando pessoas, otimizando tempo e gerando resultados reais.
          </p>

          <div className="hero-cta">
            <a href="#planos" className="btn-primary">Ver Planos</a>
            <a href="#como-funciona" className="btn-secondary">Como Funciona</a>
          </div>

          <div className="hero-features">
            <div className="feature-badge">Atendimento 24/7</div>
            <div className="feature-badge">Qualificação de LEAD</div>
            <div className="feature-badge">Configuração Rápida</div>
          </div>
        </div>

        <div className="info-box">
          <h3>Como Sua Empresa Será Atendida</h3>
          <div className="info-steps">
            <div className="info-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <strong>Cadastro rápido</strong>
                <p>Acesse o painel e configure as informações básicas do seu negócio para personalizar o atendimento.</p>
              </div>
            </div>

            <div className="info-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <strong>Receba seu link</strong>
                <p>Exemplo: ocyan-tech.com.br/seu-negocio. Seu link já vem pronto para compartilhar com clientes.</p>
              </div>
            </div>

            <div className="info-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <strong>Cliente inicia conversa estruturada</strong>
                <p>O cliente acessa o link e responde perguntas organizadas que ajudam a entender a demanda.</p>
              </div>
            </div>

            <div className="info-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <strong>Organização automática do contato</strong>
                <p>As respostas são registradas e encaminhadas para você já estruturadas, facilitando o atendimento e evitando perda de informações.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;