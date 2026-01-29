
// src/utils/knowledgeBase.ts

export interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
}

export const FAQ_BASE: FAQItem[] = [
  {
    question: 'O que está incluso no site?',
    answer:
      'Site profissional, responsivo, SEO básico, páginas estratégicas e integração com WhatsApp.',
    keywords: ['incluso', 'inclui', 'site']
  },
  {
    question: 'Vocês fazem manutenção?',
    answer:
      'Sim. Manutenção inclui hospedagem, atualizações, suporte técnico e monitoramento.',
    keywords: ['manutenção', 'suporte']
  },
  {
    question: 'Vocês fazem automação?',
    answer:
      'Sim. Automatizamos WhatsApp, formulários, captação de leads e integrações.',
    keywords: ['automação', 'automatizar', 'bot']
  },
  {
    question: 'Quanto custa?',
    answer:
      'O valor depende do diagnóstico. Por isso fazemos algumas perguntas antes.',
    keywords: ['preço', 'valor', 'custa']
  }
];

export const isQuestion = (msg: string): boolean => {
  return (
    msg.includes('?') ||
    msg.startsWith('o que') ||
    msg.startsWith('como') ||
    msg.startsWith('quanto') ||
    msg.startsWith('vocês')
  );
};

export const findFAQResponse = (msg: string): string | null => {
  const lower = msg.toLowerCase();
  const found = FAQ_BASE.find(f =>
    f.keywords.some(k => lower.includes(k))
  );
  return found ? found.answer : null;
};
