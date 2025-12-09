// src/components/Planos.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Planos.css";

const planos = [
  {
    nome: "Teste",
    valor: 1,
    descricao: [
      "Período de ajuste de produtos!"
    ],
    destaque: true,
  },
  /*{
    nome: "Starter",
    valor: 99,
    descricao: [
      "WebChat básico para comunicação com clientes",
      "1 atendente virtual pré-configurado (sem IA avançada)",
      "Gerenciamento de perguntas e respostas via painel",
      "Link personalizado para atendimento",
      "Integração com Google Agenda",
      "Suporte via WhatsApp",
    ],
    destaque: false,
  },
  {
    nome: "Professional",
    valor: 249,
    descricao: [
      "WebChat avançado com múltiplos fluxos",
      "IA intermediária para respostas personalizadas",
      "Treinamento da IA baseado no seu conteúdo",
      "Painel com relatórios de interações",
      "Integração com Google Agenda e Sheets",
      "Suporte via WhatsApp prioritário",
    ],
    destaque: true,
  },
  {
    nome: "Enterprise",
    valor: 499,
    descricao: [
      "WebChat com IA avançada e integração via API",
      "Atendentes virtuais ilimitados",
      "Chat treinado com base em documentos e sites",
      "Integração com CRM, WhatsApp Business API e redes sociais",
      "Relatórios detalhados e dashboards personalizados",
      "Personalização completa da interface",
      "Suporte técnico dedicado via WhatsApp",
    ],
    destaque: false,
  },*/
];

const Planos: React.FC = () => {
  const navigate = useNavigate();

  const selecionarPlano = (plano: string, valor: number) => {
    // Salva plano no localStorage
    localStorage.setItem(
      "planoSelecionado",
      JSON.stringify({ nome: plano, valor, timestamp: new Date().toISOString() })
    );

    // Navega para a página de contrato com query params
    navigate(`/contrato?plano=${plano}&valor=${valor}`);
  };

  return (
    <section className="planos" id="planos">
      <div className="container">
        <h2>Escolha seu Plano</h2>
        <p className="subtitle">Planos ideais para qualquer negócio!</p>
        <div className="planos-container">
          {planos.map((plano) => (
            <div
              key={plano.nome}
              className={`plano-card ${plano.destaque ? "destaque" : ""}`}
            >
              <h3>{plano.nome}</h3>
              <div className="valor">R$ {plano.valor}</div>
              <div className="periodo">por mês</div>
              
              {/* 🟢 LÓGICA CORRIGIDA: Renderização Condicional da Descrição */}
              {plano.descricao.length === 1 && plano.nome === "Teste" ? (
                  // Renderiza a descrição do plano "Teste" como parágrafo simples (resolve o mobile)
                  <p className="descricao-simples">{plano.descricao[0]}</p>
              ) : (
                  // Renderiza os demais planos (com múltiplos itens) como lista ul/li
                  <ul>
                      {plano.descricao.map((item, idx) => (
                          <li key={idx}>{item}</li>
                      ))}
                  </ul>
              )}
              {/* Fim da Correção */}

              <button onClick={() => selecionarPlano(plano.nome, plano.valor)}>
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