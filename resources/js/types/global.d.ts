import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

interface Window {
  auth?: {
    user?: {
      id: number;
      nome: string;
      email: string;
      role: 0 | 1;
    };
  };
}
