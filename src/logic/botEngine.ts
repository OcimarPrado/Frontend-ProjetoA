// src/logic/botEngine.ts

import type { DiagnosticData, BotResponse, Nicho, EstruturaAtual, EstruturaAlmejada } from '../types/diagnostic';
import { isQuestion, findFAQResponse, extractProblems } from '../utils/knowledgeBase';

// Função para calcular score de qualificação do lead
const calculateLeadScore = (data: DiagnosticData): number => {
  let score = 0;
  
  // Nicho (+20 pontos)
  if (data.nicho && data.nicho !== 'Outro') score += 20;
  
  // Estrutura atual (+15 pontos se estiver começando ou precisando melhorar)
  if (data.estruturaAtual === 'Nenhuma presença digital') score += 15;
  else if (data.estruturaAtual === 'Site básico/desatualizado') score += 12;
  
  // Estrutura almejada (+25 pontos se for ambiciosa)
  if (data.estruturaAlmejada === 'Solução completa personalizada') score += 25;
  else if (data.estruturaAlmejada?.includes('automações')) score += 20;
  else if (data.estruturaAlmejada) score += 15;
  
  // Problemas identificados (+5 por problema, máx 20)
  const problemPoints = Math.min((data.problemas?.length || 0) * 5, 20);
  score += problemPoints;
  
  // Urgência (+15 pontos)
  if (data.urgencia === 'Urgente (1-2 semanas)') score += 15;
  else if (data.urgencia === 'Médio prazo (1 mês)') score += 10;
  else if (data.urgencia) score += 5;
  
  // Orçamento (+5 pontos se definido)
  if (data.orcamento && data.orcamento !== 'A definir') score += 5;
  
  return Math.min(score, 100);
};

// Função para recomendar serviço
const recommendService = (data: DiagnosticData): string => {
  const { estruturaAtual, estruturaAlmejada, problemas } = data;
  
  // Solução completa personalizada
  if (estruturaAlmejada === 'Solução completa personalizada') {
    return '🚀 Projeto Sob Medida - Sistema completo com automações avançadas, integrações personalizadas e arquitetura escalável';
  }
  
  // Site + automação WhatsApp
  if (estruturaAlmejada === 'Site + automações WhatsApp' || 
      problemas?.includes('Sem integração com WhatsApp') ||
      problemas?.includes('Atendimento manual demais')) {
    return '🤖 Site Profissional + Automação WhatsApp - Capture leads e automatize atendimento 24/7';
  }
  
  // Site + agendamento
  if (estruturaAlmejada === 'Site + sistema de agendamento') {
    return '📅 Site + Sistema de Agendamento - Seus clientes marcam horários sozinhos, você só atende';
  }
  
  // Site + captação de leads
  if (estruturaAlmejada === 'Site + captação de leads' ||
      problemas?.includes('Dificuldade em captar leads')) {
    return '🎯 Site + Captação de Leads - Transforme visitantes em oportunidades de venda';
  }
  
  // Site novo ou reformulação
  if (estruturaAtual === 'Nenhuma presença digital' ||
      estruturaAtual === 'Site básico/desatualizado') {
    return '✨ Site Institucional Profissional - Presença digital que gera credibilidade e atrai clientes';
  }
  
  // Manutenção e evolução
  if (estruturaAtual === 'Site funcional sem automação') {
    return '🔧 Manutenção + Evolução - Melhore seu site com hospedagem premium e novas funcionalidades';
  }
  
  return '🌐 Site Profissional Responsivo - Base sólida para crescer seu negócio online';
};

export const botEngine = (
  message: string,
  data: DiagnosticData
): BotResponse => {
  const msg = message.toLowerCase().trim();

  // ========================================
  // FAQ INTELIGENTE (não interrompe fluxo crítico)
  // ========================================
  if (isQuestion(msg) && !['final', 'urgencia', 'orcamento'].includes(data.etapa)) {
    const faq = findFAQResponse(msg);
    if (faq) {
      return {
        reply: `${faq.answer}\n\n${faq.serviceHook || 'Vamos continuar seu diagnóstico?'}`,
        updatedData: data,
        isReady: false,
        showFAQ: true
      };
    }
  }

  switch (data.etapa) {
    // ========================================
    // INÍCIO - CAPTURA NOME
    // ========================================
    case 'inicio':
      return {
        reply: `Prazer, ${message}! E qual é o nome da sua empresa ou projeto?`,
        updatedData: {
          ...data,
          nome: message,
          etapa: 'nicho'
        },
        isReady: false,
        showFAQ: false
      };

    // ========================================
    // CAPTURA EMPRESA/PROJETO
    // ========================================
    case 'nicho':
      if (!data.empresa) {
        return {
          reply: 'Perfeito! Em qual área você atua?',
          updatedData: {
            ...data,
            empresa: message,
            etapa: 'nicho'
          },
          isReady: false,
          options: [
            'Saúde e Bem-estar',
            'Educação e Cursos',
            'E-commerce e Varejo',
            'Serviços Profissionais',
            'Tecnologia e Software',
            'Alimentação e Gastronomia',
            'Construção e Reformas',
            'Marketing e Publicidade',
            'Beleza e Estética',
            'Outro'
          ]
        };
      }
      
      // Capturou o nicho
      return {
        reply: 'Entendi! Como está sua presença digital hoje?',
        updatedData: {
          ...data,
          nicho: message as Nicho,
          etapa: 'estruturaAtual'
        },
        isReady: false,
        options: [
          'Nenhuma presença digital',
          'Redes sociais apenas',
          'Site básico/desatualizado',
          'Site funcional sem automação',
          'Site com algumas automações'
        ]
      };

    // ========================================
    // ESTRUTURA ATUAL
    // ========================================
    case 'estruturaAtual':
      const estruturaMsg = 
        message.includes('nenhuma') || message.includes('não') 
          ? '😮 Então você está começando do zero! Isso é ótimo, vamos criar algo incrível.'
          : message.includes('básico') || message.includes('desatualizado')
          ? '👍 Entendo, vamos transformar isso em algo profissional!'
          : '✨ Legal! Vamos te ajudar a evoluir ainda mais.';
      
      return {
        reply: `${estruturaMsg}\n\nOnde você quer chegar? Qual seria sua estrutura ideal?`,
        updatedData: {
          ...data,
          estruturaAtual: message as EstruturaAtual,
          etapa: 'estruturaAlmejada'
        },
        isReady: false,
        options: [
          'Site institucional profissional',
          'Site + captação de leads',
          'Site + automações WhatsApp',
          'Site + sistema de agendamento',
          'Solução completa personalizada'
        ]
      };

    // ========================================
    // ESTRUTURA ALMEJADA
    // ========================================
    case 'estruturaAlmejada':
      return {
        reply: 'Excelente escolha! Quais são os principais problemas que você enfrenta hoje? (pode listar vários)',
        updatedData: {
          ...data,
          estruturaAlmejada: message as EstruturaAlmejada,
          etapa: 'problemas'
        },
        isReady: false,
        options: [
          'Site desatualizado ou lento',
          'Dificuldade em captar leads',
          'Falta de automação',
          'Atendimento manual demais',
          'Sem integração com WhatsApp',
          'Não aparece no Google',
          'Design não profissional',
          'Não funciona no celular'
        ]
      };

    // ========================================
    // PROBLEMAS
    // ========================================
    case 'problemas':
      const problemas = extractProblems(message);
      const problemasTexto = problemas.length > 0 ? problemas : [message];
      
      return {
        reply: 'Perfeito, já entendi suas dores. Qual é a urgência para resolver isso?',
        updatedData: {
          ...data,
          problemas: problemasTexto,
          etapa: 'urgencia'
        },
        isReady: false,
        options: [
          'Urgente (1-2 semanas)',
          'Médio prazo (1 mês)',
          'Longo prazo (2-3 meses)'
        ]
      };

    // ========================================
    // URGÊNCIA
    // ========================================
    case 'urgencia':
      let urgenciaReal: 'Urgente (1-2 semanas)' | 'Médio prazo (1 mês)' | 'Longo prazo (2-3 meses)';
      
      if (msg.includes('urgente') || msg.includes('rápido') || msg.includes('já') || msg.includes('semana')) {
        urgenciaReal = 'Urgente (1-2 semanas)';
      } else if (msg.includes('médio') || msg.includes('medio') || msg.includes('mês') || msg.includes('mes')) {
        urgenciaReal = 'Médio prazo (1 mês)';
      } else {
        urgenciaReal = 'Longo prazo (2-3 meses)';
      }
      
      return {
        reply: 'Última pergunta: você já tem uma ideia de orçamento para investir nesse projeto?',
        updatedData: {
          ...data,
          urgencia: urgenciaReal,
          etapa: 'orcamento'
        },
        isReady: false,
        options: [
          'Até R$ 2.000',
          'R$ 2.000 - R$ 5.000',
          'R$ 5.000 - R$ 10.000',
          'Acima de R$ 10.000',
          'A definir'
        ]
      };

    // ========================================
    // ORÇAMENTO + FINALIZAÇÃO
    // ========================================
    case 'orcamento': {
      let orcamentoFinal: 'Até R$ 2.000' | 'R$ 2.000 - R$ 5.000' | 'R$ 5.000 - R$ 10.000' | 'Acima de R$ 10.000' | 'A definir';
      
      if (msg.includes('2000') || msg.includes('dois mil') || msg.includes('até')) {
        orcamentoFinal = 'Até R$ 2.000';
      } else if (msg.includes('5000') || msg.includes('cinco mil') || (msg.includes('2') && msg.includes('5'))) {
        orcamentoFinal = 'R$ 2.000 - R$ 5.000';
      } else if (msg.includes('10000') || msg.includes('dez mil') || (msg.includes('5') && msg.includes('10'))) {
        orcamentoFinal = 'R$ 5.000 - R$ 10.000';
      } else if (msg.includes('acima') || msg.includes('mais') || msg.includes('10')) {
        orcamentoFinal = 'Acima de R$ 10.000';
      } else {
        orcamentoFinal = 'A definir';
      }

      const updatedData: DiagnosticData = {
        ...data,
        orcamento: orcamentoFinal,
        etapa: 'final'
      };

      const score = calculateLeadScore(updatedData);
      const servico = recommendService(updatedData);

      const finalData: DiagnosticData = {
        ...updatedData,
        score,
        servicoIndicado: servico
      };

      const scoreEmoji = score >= 80 ? '🔥' : score >= 60 ? '✨' : '👍';
      
      return {
        reply: `${scoreEmoji} Diagnóstico concluído!\n\n📊 Qualificação: ${score}/100\n\n💡 SOLUÇÃO RECOMENDADA:\n${servico}\n\nVou preparar um resumo completo e você pode falar diretamente com nossa equipe para fechar!`,
        updatedData: finalData,
        isReady: true,
        showFAQ: false
      };
    }

    // ========================================
    // FINAL (após diagnóstico)
    // ========================================
    case 'final':
      return {
        reply: 'Diagnóstico já finalizado! Clique no botão abaixo para falar com a equipe e fechar seu projeto. 🚀',
        updatedData: data,
        isReady: true
      };

    // ========================================
    // FALLBACK
    // ========================================
    default:
      return {
        reply: 'Opa, vamos recomeçar do início para eu te entender melhor! Como posso te chamar?',
        updatedData: { etapa: 'inicio' },
        isReady: false
      };
  }
};