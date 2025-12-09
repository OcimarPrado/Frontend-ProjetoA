// src/utils/knowledgeBase.ts

interface FAQ {
  question: string;
  response: string;
  keywords: string[];
}

export const FAQ_BASE: FAQ[] = [
  {
    question: "Planos e Preços",
    response: "Temos planos Básico, Pro e Empresarial. Os preços variam de acordo com o volume de mensagens e a necessidade de integrações avançadas. Posso te enviar a tabela de preços detalhada por email.",
    keywords: ["plano", "preço", "custo", "valor", "quanto custa"],
  },
  {
    question: "Período de Teste Gratuito",
    response: "Sim! Oferecemos um período de teste gratuito de 7 dias para que você possa experimentar todas as funcionalidades sem compromisso. Após esse período, você escolhe se deseja continuar.",
    keywords: ["teste", "gratuito", "trial", "free", "demo"],
  },
  {
    question: "Cobra instalação/implementação?",
    response: "A implementação básica é gratuita e guiada. Apenas projetos de integração complexa ou customizações profundas podem ter uma taxa de setup única, que é negociada à parte.",
    keywords: ["instalação", "implementação", "setup", "cobrança", "taxa"],
  },
  {
    question: "Como funciona a integração?",
    response: "Nossa API é robusta e fácil de integrar com as principais plataformas (CRM, ERP, WhatsApp, Telegram). Oferecemos documentação completa e suporte técnico para te ajudar no processo.",
    keywords: ["integrar", "api", "conexão", "plataforma", "whatsapp"],
  },
  {
    question: "Suporte Técnico",
    response: "Oferecemos suporte técnico 24/7 para todos os clientes, garantindo que seu atendimento nunca pare. Para questões críticas, a prioridade de resposta é imediata.",
    keywords: ["suporte", "problema", "ajuda", "assistência", "técnico"],
  },
  {
    question: "Customização e Branding",
    response: "Sim, o bot é totalmente customizável! Você pode ajustar a linguagem, o tom de voz e o branding visual para se adequar perfeitamente à sua marca.",
    keywords: ["customização", "marca", "branding", "aparencia"],
  },
];

export const getBotResponse = (userInput: string): string => {
  const lowerInput = userInput.toLowerCase();

  for (const faq of FAQ_BASE) {
    if (faq.keywords.some(keyword => lowerInput.includes(keyword))) {
      return faq.response;
    }
  }

  // Resposta padrão
  return 'Desculpe, não encontrei uma resposta direta para sua pergunta. Você pode tentar reformular, escolher uma opção abaixo, ou enviar um e-mail para nossa equipe.';
};