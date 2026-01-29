// src/utils/knowledgeBase.ts

interface FAQ {
  question: string;
  answer: string;
  intent: "info" | "venda";
}

export const FAQ_BASE: FAQ[] = [
  {
    question: "o que está incluso",
    answer:
      "Criamos sites modernos, rápidos e responsivos (celular, tablet e computador), com estrutura preparada para SEO, páginas estratégicas para seus serviços e botões de contato ou agendamento. Posso te explicar qual formato funciona melhor para o seu negócio.",
    intent: "info",
  },
  {
    question: "manutenção",
    answer:
      "Sim. Temos um plano recomendado que inclui hospedagem, suporte técnico, atualizações de segurança, performance e ajustes contínuos. É a opção ideal para quem não quer se preocupar com parte técnica.",
    intent: "venda",
  },
  {
    question: "contrato",
    answer:
      "Sim. Todo serviço é formalizado com contrato, garantindo segurança, clareza e profissionalismo para ambos os lados.",
    intent: "info",
  },
  {
    question: "não fazem",
    answer:
      "Não fazemos gestão de redes sociais ou edição de vídeos longos. Nosso foco é desenvolvimento web profissional e automações sob medida.",
    intent: "info",
  },
];

export const getBotResponse = (query: string): string => {
  const q = query.toLowerCase();

  // Preço / plano → fechamento
  if (q.includes("preço") || q.includes("valor") || q.includes("plano")) {
    return (
      "Trabalhamos com duas opções principais: site sob medida com entrega única ou site com manutenção contínua (mais recomendado). Posso te indicar a melhor opção se me disser qual é o seu tipo de negócio."
    );
  }

  // Automação → upsell
  if (q.includes("automação") || q.includes("sistema") || q.includes("processo")) {
    return (
      "Sim, também desenvolvemos automações sob medida para otimizar atendimento, agendamentos, formulários e processos internos. Quer me contar rapidamente o que você gostaria de automatizar?"
    );
  }

  // SEO
  if (q.includes("seo")) {
    return (
      "O site já é entregue preparado para SEO técnico. Isso ajuda seu negócio a ser encontrado no Google desde o início. Você já possui site ou esse seria o primeiro?"
    );
  }

  // FAQ padrão
  const faq = FAQ_BASE.find(f => q.includes(f.question));
  if (faq) {
    return `${faq.answer} Quer que eu te mostre a melhor opção para o seu caso?`;
  }

  // Lead fallback (captura)
  return (
    "Consigo te orientar certinho e indicar a melhor solução. Você já tem site ou está começando agora?"
  );
};
