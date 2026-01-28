// src/utils/knowledgeBase.ts

interface FAQ {
  question: string;
  response: string;
  keywords: string[];
}

export const FAQ_BASE = [
  {
    question: "O que está incluso no site?",
    answer: "Desenvolvemos sites modernos e responsivos (celular, tablet e computador) com estrutura otimizada para SEO, páginas estratégicas para seus serviços e botões de agendamento integrados."
  },
  {
    question: "Vocês fazem manutenção?",
    answer: "Sim! Temos uma opção recomendada que inclui hospedagem, monitoramento técnico, atualizações de segurança, performance e ajustes técnicos contínuos para garantir que seu site nunca fique desatualizado."
  },
  {
    question: "O serviço tem contrato?",
    answer: "Com certeza. Todas as nossas opções são validadas legalmente mediante contrato assinado por ambas as partes, garantindo total segurança e profissionalismo na nossa parceria."
  },
  {
    question: "O que vocês NÃO fazem?",
    answer: "Nosso foco é em desenvolvimento web profissional e estratégico. Não realizamos gestão de redes sociais (postagens diárias), edição de vídeos longos ou reparos em hardware/computadores."
  }
];

export const getBotResponse = (query: string): string => {
  const q = query.toLowerCase();
  if (q.includes("plano") || q.includes("valor") || q.includes("preço")) {
    return "Temos duas modalidades principais: o Desenvolvimento Único (focado na entrega do site pronto) e o Site + Manutenção (nossa parceria contínua com hospedagem inclusa). Qual dessas faz mais sentido para o seu momento atual?";
  }
  if (q.includes("seo")) {
    return "O SEO é a organização técnica que fazemos no seu site para facilitar que ele seja encontrado pelo Google. Já entregamos o site preparado para isso!";
  }
  // Resposta padrão caso não encontre palavra-chave
  const faq = FAQ_BASE.find(f => q.includes(f.question.toLowerCase()));
  return faq ? faq.answer : "Essa é uma ótima pergunta! Nossa equipe técnica pode te dar mais detalhes sobre isso. Gostaria de prosseguir com seu interesse em algum de nossos serviços?";
};
  
