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
            <a href="https://wa.me/5551986730107?text=Olá, acessei o site ocyan-tech e gostaria de saber mais sobre seus serviços." className="btn-primary" target="_blank" rel="noopener noreferrer">Saiba Mais</a>
          </div>

          <div className="hero-features">
            <div className="feature-badge">Sites institucionais e landing pages</div>
            <div className="feature-badge">Sites institucionais e landing pages</div>
            <div className="feature-badge">Automação sob demanda</div>
          </div>
        </div>

        <div className="info-box">
          <h3>Como Sua Empresa Será Atendida</h3>
          <div className="info-steps">
            <div className="info-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <strong>Análise do seu negócio</strong>
                <p>Entendemos seu público, objetivo e tipo de serviço para definir a estrutura certa do site.</p>
              </div>
            </div>

            <div className="info-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <strong>Deisgn estratégico sob medida</strong>
                <p>Desenvolvemos um visual profissional alinhado à identidade da marca, focado em clareza, confiança e conversão.</p>
              </div>
            </div>

            <div className="info-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <strong>Desenvolvimento e publicação</strong>
                <p>Executamos o desenvolvimento completo do site, com configuração técnica, publicação e testes finais.</p>
              </div>
            </div>

            <div className="info-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <strong>Acompanhamento após entrega</strong>
                <p>Oferecemos suporte inicial, orientações e ajutes necessários para garantir o pleno funcionamento do projeto.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
