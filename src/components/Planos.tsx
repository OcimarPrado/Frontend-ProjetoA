// src/components/Planos.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Planos.css";

interface Plano {
  nome: string;
  valor: number;
  descricao: string[];
  destaque: boolean;
}

const planos: Plano[] = [
  {
    nome: "Teste",
    valor: 1,
    descricao: [
      "Website, garantindo sua presença online",
      "WebChat básico para atendimento online",
      "1 atendente virtual configurado",
      "Respostas automáticas personalizáveis",
      "Link exclusivo para atendimento",
      "Integração com Google Agenda",
      "Suporte via WhatsApp",
    ],
    destaque: true,
  },
  /*{
    nome: "Starter",
    valor: 149,
    descricao: [
      "Website, garantindo sua presença online",
      "WebChat básico para atendimento online",
      "1 atendente virtual configurado",
      "Respostas automáticas personalizáveis",
      "Link exclusivo para atendimento",
      "Integração com Google Agenda",
      "Suporte via WhatsApp",
    ],
    destaque: false,
  },
  {
    nome: "Professional",
    valor: 299,
    descricao: [
      "WebChat com múltiplos fluxos inteligentes",
      "IA intermediária com respostas contextualizadas",
      "Treinamento baseado no seu negócio",
      "Relatórios de interações e desempenho",
      "Integração com Google Agenda e Sheets",
      "Suporte prioritário",
    ],
    destaque: true,
  },
  {
    nome: "Enterprise",
    valor: 499,
    descricao: [
      "WebChat com IA avançada e integração via API",
      "Atendentes virtuais ilimitados",
      "Treinamento com documentos e site da empresa",
      "Integração com CRM e WhatsApp Business API",
      "Dashboards personalizados",
      "Customização completa da interface",
      "Suporte técnico dedicado",
    ],
    destaque: false,
  },*/
];

const Planos: React.FC = () => {
  const navigate = useNavigate();

  const selecionarPlano = (plano: string, valor: number) => {
    const dadosPlano = {
      nome: plano,
      valor,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("planoSelecionado", JSON.stringify(dadosPlano));

    navigate(`/contrato?plano=${encodeURIComponent(plano)}&valor=${valor}`);
  };

  return (
    <section className="planos" id="planos">
      <div className="container">
        <h2>Planos de Automação Inteligente</h2>
        <p className="subtitle">
          Atendimento estruturado, inteligente e escalável para seu negócio
        </p>

        <div className="planos-container">
          {planos.map((plano) => (
            <div
              key={plano.nome}
              className={`plano-card ${plano.destaque ? "destaque" : ""}`}
            >
              {plano.destaque && (
                <div className="badge-destaque">Mais Escolhido</div>
              )}

              <h3>{plano.nome}</h3>

              <div className="valor">
                R$ {plano.valor}
                <span className="periodo">/mês</span>
              </div>

              <ul>
                {plano.descricao.map((item, idx) => (
                  <li key={idx}>
                    <span className="check"></span> {item}
                  </li>
                ))}
              </ul>

              <button
                className="btn-plano"
                onClick={() => selecionarPlano(plano.nome, plano.valor)}
              >
                Contratar {plano.nome}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Planos;
