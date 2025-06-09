import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { toast } from 'sonner';

interface Notificacao {
  id: number;
  mensagem: string;
  data: string;
  lida: boolean;
}

const AdminNotificacoes = () => {
  const { usuario } = useAuth();
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarNotificacoes = async () => {
      try {
        const response = await api.get(`/notificacoes/usuario/${usuario?.id}`);
        setNotificacoes(response.data);
      } catch (error) {
        toast.error('Erro ao carregar notificações');
      } finally {
        setLoading(false);
      }
    };

    if (usuario?.id) {
      carregarNotificacoes();
    }
  }, [usuario?.id]);

  const marcarComoLida = async (id: number) => {
    try {
      await api.patch(`/notificacoes/${id}/marcar-como-lida`);
      setNotificacoes(notificacoes.map(n => 
        n.id === id ? { ...n, lida: true } : n
      ));
      toast.success('Notificação marcada como lida');
    } catch (error) {
      toast.error('Erro ao marcar notificação como lida');
    }
  };

  const marcarTodasComoLidas = async () => {
    try {
      await api.patch(`/notificacoes/usuario/${usuario?.id}/marcar-todas-como-lidas`);
      setNotificacoes(notificacoes.map(n => ({ ...n, lida: true })));
      toast.success('Todas as notificações foram marcadas como lidas');
    } catch (error) {
      toast.error('Erro ao marcar notificações como lidas');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AdminHeader />
        <main className="flex-grow p-6">
          <div className="text-center py-12">Carregando...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Notificações</h1>
            {notificacoes.some(n => !n.lida) && (
              <Button onClick={marcarTodasComoLidas}>
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
                        onClick={() => marcarComoLida(notificacao.id)}
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
