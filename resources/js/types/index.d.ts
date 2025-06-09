import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface SharedData {
  auth: {
    user: User | null;
  };
  ziggy: Config;
  [key: string]: unknown;
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    role?: number;// 1 = admin, 0 = usuário comum, etc.
    is_admin?: boolean; // Optional, for admin check
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export enum EstadoDenuncia {
    Nova = 'pendente',
    EmAnalise = 'em_analise',
    Resolvida = 'resolvida',
    Arquivada = 'arquivada'
}

export interface Denuncia {
    id: number;
    usuario_id?: number;
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

export interface Notificacao {
    id: number;
    usuario_id: number;
    mensagem: string;
    tipo: string; // 'email', 'whatsapp'
    data: string;
    lida: boolean;
}
