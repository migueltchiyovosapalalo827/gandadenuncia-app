import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface Notificacao {
  id: number;
  mensagem: string;
  data: string;
  lida: boolean;
}

interface PageProps extends InertiaPageProps {
  notificacoes: Notificacao[];
}

const AdminNotificacoes = () => {
  const { notificacoes = [] } = usePage<PageProps>().props;

  // As funções de marcar como lida podem ser feitas via Inertia.post/patch
  // Exemplo:
  // Inertia.patch(route('notificacoes.marcarComoLida', { id: notificacao.id }))

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Notificações</h1>
            {notificacoes.some(n => !n.lida) && (
              <Button
                onClick={() => {
                  // Exemplo de chamada Inertia para marcar todas como lidas
                  // Inertia.patch(route('notificacoes.marcarTodasComoLidas', { usuario: usuario?.id }))
                }}
              >
                Marcar todas como lidas
              </Button>
            )}
          </div>
          <div className="space-y-4">
            {notificacoes.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                Nenhuma notificação encontrada
              </div>
            ) : (
              notificacoes.map((notificacao) => (
                <div
                  key={notificacao.id}
                  className={`bg-white rounded-lg shadow-md p-4 ${
                    !notificacao.lida ? 'border-l-4 border-brand-blue' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-800">{notificacao.mensagem}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(notificacao.data).toLocaleString()}
                      </p>
                    </div>
                    {!notificacao.lida && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Exemplo de chamada Inertia para marcar como lida
                          // Inertia.patch(route('notificacoes.marcarComoLida', { id: notificacao.id }))
                        }}
                      >
                        Marcar como lida
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminNotificacoes;
