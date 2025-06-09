declare module 'ziggy-js' {
  export type RouteName = string;
  export function route(name: RouteName, params?: Record<string, unknown>, absolute?: boolean, config?: Config): string;
  export interface Config {
    url: string;
    port: number | null;
    defaults: Record<string, unknown>;
    routes: Record<string, unknown>;
  }
} 