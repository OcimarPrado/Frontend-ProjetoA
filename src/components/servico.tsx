
import React from "react";
import "../styles/servico.css";

const Servico: React.FC = () => {
  return (
    <section className="servico">
      <div className="container">
        <h1>Serviços</h1>
        <p className="subtitle">
          Presença digital profissional, simples e preparada para crescer.
        </p>

        <div className="servico-bloco">
          <h2>Criação de Sites Profissionais</h2>
          <p>
            Desenvolvemos sites institucionais modernos, rápidos e responsivos,
            pensados para gerar credibilidade e facilitar o contato com seus
            clientes.
          </p>
          <ul>
            <li>Design profissional e objetivo</li>
            <li>Estrutura clara e organizada</li>
            <li>Compatível com celular, tablet e desktop</li>
            <li>Publicação e testes finais inclusos</li>
          </ul>
        </div>

        <div className="servico-bloco">
          <h2>Site com Manutenção e Hospedagem</h2>
          <p>
            Ideal para quem não quer se preocupar com a parte técnica após a
            entrega do site.
          </p>
          <ul>
            <li>Hospedagem estável e segura</li>
            <li>Atualizações técnicas básicas</li>
            <li>Correções pontuais</li>
            <li>Suporte contínuo</li>
          </ul>
        </div>

        <div className="servico-bloco">
          <h2>Estrutura Preparada para Crescimento</h2>
          <p>
            Mesmo projetos simples já nascem preparados para futuras integrações
            e evoluções conforme o negócio cresce.
          </p>
          <ul>
            <li>Integração com ferramentas externas</li>
            <li>Agendamentos online</li>
            <li>Automações sob demanda</li>
          </ul>
        </div>

        <div className="servico-bloco">
          <h2>Projetos Sob Medida</h2>
          <p>
            Para negócios que exigem soluções específicas, desenvolvemos sistemas
            personalizados conforme a necessidade.
          </p>
          <ul>
            <li>Backends personalizados</li>
            <li>Integração com APIs externas</li>
            <li>Sistemas de agendamento</li>
            <li>Automações avançadas</li>
          </ul>
        </div>

        <div className="servico-cta">
          <a
            href="https://wa.me/5551986730107?text=Olá, acessei o site da Ocyan-Tech e gostaria de saber mais sobre os serviços."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Falar com a Ocyan-Tech
          </a>
        </div>
      </div>
    </section>
  );
};

export default Servico;
