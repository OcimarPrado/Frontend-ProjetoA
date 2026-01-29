import type { DiagnosticData } from '../types/diagnostic';
import { isQuestion, findFAQResponse } from '../utils/knowledgeBase';

export const botEngine = (
  message: string,
  data: DiagnosticData
): {
  reply: string;
  updatedData: DiagnosticData;
  isReady: boolean;
} => {
  const msg = message.toLowerCase();

  // FAQ só responde se NÃO estiver em etapa crítica
  if (isQuestion(msg) && data.etapa !== 'final') {
    const faq = findFAQResponse(msg);
    if (faq) {
      return {
        reply: faq,
        updatedData: data,
        isReady: false
      };
    }
  }

  switch (data.etapa) {
    /* =======================
       INÍCIO – CAPTURA NOME
       ======================= */
    case 'inicio':
      return {
        reply: 'Perfeito. Você já possui site?',
        updatedData: {
          ...data,
          nome: message,
          etapa: 'temSite'
        },
        isReady: false
      };

    /* =======================
       POSSUI SITE?
       ======================= */
    case 'temSite':
      return {
        reply: 'Qual é o principal objetivo do site: autoridade ou vendas?',
        updatedData: {
          ...data,
          temSite: msg.includes('sim'),
          etapa: 'objetivo'
        },
        isReady: false
      };

    /* =======================
       OBJETIVO
       ======================= */
    case 'objetivo':
      return {
        reply:
          'Você prefere cuidar do site sozinho ou ter suporte contínuo (manutenção)?',
        updatedData: {
          ...data,
          objetivo: msg.includes('venda')
            ? 'Vendas/Conversão'
            : 'Autoridade',
          etapa: 'manutencao'
        },
        isReady: false
      };

    /* =======================
       MANUTENÇÃO
       ======================= */
    case 'manutencao':
      return {
        reply:
          'Existe alguma automação que você imagina precisar? (WhatsApp, formulários, integrações)',
        updatedData: {
          ...data,
          querManutencao:
            msg.includes('sim') || msg.includes('manutenção'),
          etapa: 'automacao'
        },
        isReady: false
      };

    /* =======================
       AUTOMAÇÃO + FECHAMENTO
       ======================= */
    case 'automacao': {
      const querAutomacao = !msg.includes('não');

      const servicoIndicado = querAutomacao
        ? 'Automação de Sites'
        : data.querManutencao
        ? 'Site + Manutenção e Hospedagem'
        : 'Site Institucional';

      return {
        reply:
          'Perfeito. Com base no seu cenário, já consigo indicar a melhor solução.',
        updatedData: {
          ...data,
          querAutomacao,
          servicoIndicado,
          etapa: 'final'
        },
        isReady: true
      };
    }

    /* =======================
       FINAL
       ======================= */
    case 'final':
      return {
        reply:
          'Diagnóstico concluído. Caso queira, posso ajustar a proposta.',
        updatedData: data,
        isReady: true
      };

    default:
      return {
        reply: 'Vamos seguir com o diagnóstico.',
        updatedData: { ...data, etapa: 'inicio' },
        isReady: false
      };
  }
};
