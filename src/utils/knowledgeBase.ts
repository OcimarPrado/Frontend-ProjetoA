// src/utils/knowledgeBase.ts

export interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
  serviceHook?: string; // Gancho para venda
}

export const FAQ_BASE: FAQItem[] = [
  {
    question: 'O que está incluso no site?',
    answer:
      'Site profissional responsivo, SEO otimizado, integração WhatsApp, páginas estratégicas e painel administrativo. Tudo pensado para converter visitantes em clientes.',
    keywords: ['incluso', 'inclui', 'site', 'tem no site'],
    serviceHook: 'Quer saber qual plano se encaixa melhor no seu negócio?'
  },
  {
    question: 'Vocês fazem manutenção?',
    answer:
      'Sim! Oferecemos planos de manutenção com hospedagem premium, atualizações, suporte técnico prioritário, backups automáticos e monitoramento 24/7.',
    keywords: ['manutenção', 'suporte', 'hospedagem', 'atualização'],
    serviceHook: 'Posso te ajudar a escolher o melhor plano de manutenção.'
  },
  {
    question: 'Vocês fazem automação?',
    answer:
      'Sim! Automatizamos WhatsApp, formulários inteligentes, captação de leads, agendamentos, emails marketing e integrações com CRM. Tudo para você focar no que importa: fechar vendas.',
    keywords: ['automação', 'automatizar', 'bot', 'whatsapp', 'lead'],
    serviceHook: 'Quer descobrir quais automações podem revolucionar seu negócio?'
  },
  {
    question: 'Quanto custa?',
    answer:
      'Nossos projetos variam de R$ 1.500 a R$ 15.000+, dependendo da complexidade. Fazemos um diagnóstico gratuito para recomendar a melhor solução custo-benefício.',
    keywords: ['preço', 'valor', 'custa', 'quanto', 'investimento'],
    serviceHook: 'Posso fazer um diagnóstico rápido para te dar um valor exato.'
  },
  {
    question: 'Quanto tempo leva?',
    answer:
      'Site institucional: 7-15 dias. Site com automações: 15-30 dias. Projetos personalizados: 30-60 dias. Tudo depende da complexidade e do seu prazo.',
    keywords: ['tempo', 'prazo', 'demora', 'quanto tempo', 'entrega'],
    serviceHook: 'Tenho urgência? Posso priorizar seu projeto.'
  },
  {
    question: 'Como funciona o processo?',
    answer:
      '1️⃣ Diagnóstico gratuito\n2️⃣ Proposta personalizada\n3️⃣ Desenvolvimento iterativo\n4️⃣ Testes e ajustes\n5️⃣ Publicação e treinamento\n6️⃣ Suporte contínuo',
    keywords: ['processo', 'como funciona', 'etapas', 'como é'],
    serviceHook: 'Quer começar agora? Vamos fazer seu diagnóstico!'
  },
  {
    question: 'Preciso ter site próprio?',
    answer:
      'Não necessariamente! Se você está começando, podemos criar do zero. Se já tem, podemos melhorar, redesenhar ou migrar para uma solução mais profissional.',
    keywords: ['preciso', 'necessário', 'obrigatório', 'já tenho'],
    serviceHook: 'Me conta sua situação atual que eu te oriento!'
  },
  {
    question: 'Vocês fazem e-commerce?',
    answer:
      'Sim! Desenvolvemos lojas virtuais completas com carrinho, checkout, pagamentos integrados, gestão de estoque e painel administrativo.',
    keywords: ['e-commerce', 'loja virtual', 'vender online', 'loja'],
    serviceHook: 'Quer uma loja que vende no automático?'
  }
];

export const PROBLEMAS_COMUNS = [
  'Site desatualizado ou lento',
  'Dificuldade em captar leads',
  'Falta de automação',
  'Atendimento manual demais',
  'Sem integração com WhatsApp',
  'Não aparece no Google',
  'Design não profissional',
  'Não funciona no celular'
];

export const isQuestion = (msg: string): boolean => {
  const questionWords = ['?', 'o que', 'como', 'quanto', 'qual', 'vocês', 'existe', 'tem', 'fazem', 'pode'];
  const lower = msg.toLowerCase();
  return questionWords.some(word => lower.includes(word));
};

export const findFAQResponse = (msg: string): FAQItem | null => {
  const lower = msg.toLowerCase();
  const found = FAQ_BASE.find(f =>
    f.keywords.some(k => lower.includes(k))
  );
  return found || null;
};

export const extractProblems = (msg: string): string[] => {
  const lower = msg.toLowerCase();
  return PROBLEMAS_COMUNS.filter(p => 
    lower.includes(p.toLowerCase().split(' ')[0])
  );
};