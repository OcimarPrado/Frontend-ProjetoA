// src/types/diagnostic.ts

export type Etapa =
  | 'inicio'
  | 'nicho'
  | 'estruturaAtual'
  | 'estruturaAlmejada'
  | 'problemas'
  | 'urgencia'
  | 'orcamento'
  | 'final';

export type Nicho =
  | 'Saúde e Bem-estar'
  | 'Educação e Cursos'
  | 'E-commerce e Varejo'
  | 'Serviços Profissionais'
  | 'Tecnologia e Software'
  | 'Alimentação e Gastronomia'
  | 'Construção e Reformas'
  | 'Marketing e Publicidade'
  | 'Beleza e Estética'
  | 'Outro';

export type EstruturaAtual =
  | 'Nenhuma presença digital'
  | 'Redes sociais apenas'
  | 'Site básico/desatualizado'
  | 'Site funcional sem automação'
  | 'Site com algumas automações';

export type EstruturaAlmejada =
  | 'Site institucional profissional'
  | 'Site + captação de leads'
  | 'Site + automações WhatsApp'
  | 'Site + sistema de agendamento'
  | 'Solução completa personalizada';

export interface DiagnosticData {
  etapa: Etapa;
  nome?: string;
  empresa?: string;
  nicho?: Nicho;
  estruturaAtual?: EstruturaAtual;
  estruturaAlmejada?: EstruturaAlmejada;
  problemas?: string[];
  urgencia?: 'Urgente (1-2 semanas)' | 'Médio prazo (1 mês)' | 'Longo prazo (2-3 meses)';
  orcamento?: 'Até R$ 2.000' | 'R$ 2.000 - R$ 5.000' | 'R$ 5.000 - R$ 10.000' | 'Acima de R$ 10.000' | 'A definir';
  servicoIndicado?: string;
  score?: number; // 0-100 - qualificação do lead
}

export interface BotResponse {
  reply: string;
  updatedData: DiagnosticData;
  isReady: boolean;
  options?: string[]; // Opções de resposta rápida
  showFAQ?: boolean; // Se deve mostrar FAQs
}