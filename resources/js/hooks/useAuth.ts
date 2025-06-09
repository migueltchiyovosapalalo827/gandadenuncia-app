import { router } from '@inertiajs/react';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: 'admin' | 'user';
}

interface AuthReturn {
  usuario: Usuario | undefined;
  logout: () => void;
  isAuthenticated: boolean;
}

declare global {
  interface Window {
    auth?: {
      user?: Usuario;
    };
  }
}

export function useAuth(): AuthReturn {
  const usuario = window.auth?.user as Usuario | undefined;

  const logout = () => {
    router.post('/logout');
  };

  return {
    usuario,
    logout,
    isAuthenticated: !!usuario,
  };
} 