export type Etapa =
  | 'inicio'
  | 'temSite'
  | 'objetivo'
  | 'manutencao'
  | 'automacao'
  | 'final';

export interface DiagnosticData {
  etapa: Etapa;
  nome?: string;
  temSite?: boolean;
  objetivo?: 'Autoridade' | 'Vendas/Conversão';
  querManutencao?: boolean;
  querAutomacao?: boolean;
  servicoIndicado?: string;
}
