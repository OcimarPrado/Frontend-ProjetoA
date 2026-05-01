import React from "react";
import "../styles/Hero.css";

const Hero: React.FC = () => {
  return (
    <section className="hero" id="inicio">
      {/* Orbs de fundo animados */}
      <div className="hero-orb hero-orb--1" aria-hidden="true" />
      <div className="hero-orb hero-orb--2" aria-hidden="true" />
      <div className="hero-orb hero-orb--3" aria-hidden="true" />

      <div className="hero-inner">
        {/* ===== COLUNA ESQUERDA ===== */}
        <div className="hero-text">
          {/* Eyebrow badge */}
          <div className="hero-eyebrow">
            <span className="dot" />
            Automação inteligente para negócios
          </div>

          {/* Heading */}
          <h1>
            <span className="highlight">Acelere</span> seu atendimento,{" "}
            <span className="highlight">transforme</span> experiências e{" "}
            <span className="highlight">converta</span> cada interação em resultados.
          </h1>

          {/* Descrição */}
          <p className="hero-description">
            Conecte sua empresa com clientes de forma inteligente e automatizada
            — aproximando pessoas, otimizando tempo e gerando receita real.
          </p>

          {/* CTAs */}
          <div className="hero-cta">
            <a href="#planos" className="btn-primary">Ver Planos</a>
            <a href="#como-funciona" className="btn-secondary">Como Funciona</a>
          </div>

          {/* Feature badges com Tooltips */}
          <div className="hero-features">
            <div className="feature-container" tabIndex={0}>
              <div className="feature-badge">Atendimento 24/7</div>
              <div className="tooltip">Sua empresa nunca dorme. Respostas instantâneas em qualquer horário.</div>
            </div>

            <div className="feature-container" tabIndex={0}>
              <div className="feature-badge">Qualificação de Lead</div>
              <div className="tooltip">Filtre curiosos e foque apenas em clientes com real potencial de compra.</div>
            </div>

            <div className="feature-container" tabIndex={0}>
              <div className="feature-badge">Configuração Rápida</div>
              <div className="tooltip">Implementação ágil para você começar a vender mais em poucos dias.</div>
            </div>

            <div className="feature-container" tabIndex={0}>
              <div className="feature-badge">Multi-canal</div>
              <div className="tooltip">Atenda via Web, WhatsApp e Instagram de forma centralizada.</div>
            </div>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">+<em>200</em></span>
              <span className="stat-label">Empresas atendidas</span>
            </div>
            <div className="stat-item">
              <span className="stat-value"><em>98</em>%</span>
              <span className="stat-label">Satisfação dos clientes</span>
            </div>
            <div className="stat-item">
              <span className="stat-value"><em>3x</em></span>
              <span className="stat-label">Mais conversões</span>
            </div>
          </div>
        </div>

        {/* ===== COLUNA DIREITA — INFO BOX ===== */}
        <div className="info-box">
          <div className="info-box-header">
            <div className="info-box-icon" aria-hidden="true">⚡</div>
            <h3>Como Sua Empresa Será Atendida</h3>
          </div>

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
                <p>ocyan-tech.com.br/seu-negocio pronto para compartilhar.</p>
              </div>
            </div>

            <div className="info-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <strong>Conversa estruturada</strong>
                <p>O cliente responde perguntas organizadas que facilitam a venda.</p>
              </div>
            </div>

            <div className="info-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <strong>Gestão agilizada</strong>
                <p>As respostas chegam estruturadas para você fechar o negócio rápido.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
