export enum EstadoDenuncia {
  Nova = 'pendente',
  EmAnalise = 'em_analise',
  Resolvida = 'resolvida',
  Arquivada = 'arquivada'
}

export interface Denuncia {
  id: number;
  titulo: string;
  descricao: string;
  localizacao: string;
  status: EstadoDenuncia;
  contato?: string;
  created_at: string;
  updated_at: string;
}

export interface ArquivoDenuncia {
  id: number;
  denuncia_id: number;
  caminho: string;
  nome_arquivo: string;
}

export interface Comentario {
  id: number;
  denuncia_id: number;
  user_id: number;
  comentario: string;
  data: string;
} 