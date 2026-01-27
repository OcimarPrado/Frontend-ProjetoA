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
            Criamos sites rápidos, modernos e prontos para vender.
            Se precisar, automatizamos atendimento, agendamentos e processos.</p>

          <div className="hero-cta">
            <a href="https://wa.me/5551986730107?text=Olá, acessei o site ocyan-tech e gostaria de saber mais sobre seus serviços." className="btn-primary">Ver Planos</a>
          </div>

          <div className="hero-features">
            <div className="feature-badge">Atendimento 24/7</div>
            <div className="feature-badge">IA Treinada</div>
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
                <p>Acesse o painel e configure seu atendente virtual com informações do seu negócio.</p>
              </div>
            </div>

            <div className="info-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <strong>Receba seu link</strong>
                <p>Exemplo: ocyan-tech.com.br/seu-negocio</p>
              </div>
            </div>

            <div className="info-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <strong>Cliente acessa</strong>
                <p>Seus clientes conversam com IA treinada especificamente para seu negócio.</p>
              </div>
            </div>

            <div className="info-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <strong>IA atende automaticamente</strong>
                <p>Responde dúvidas, agenda horários e qualifica leads 24 horas por dia.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
