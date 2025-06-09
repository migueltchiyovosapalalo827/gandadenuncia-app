import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Denuncia } from '@/types';
import AdminLayout from '@/components/admin/AdminLayout';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Swal from 'sweetalert2';

interface PageProps {
  denuncias: Denuncia[];
  [key: string]: unknown;
}

const AdminDenuncias = () => {
  const { denuncias } = usePage<PageProps>().props;
  const [busca, setBusca] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  
  const denunciasFiltradas = denuncias.filter((denuncia) => {
    const matchBusca = !busca || 
      denuncia.titulo.toLowerCase().includes(busca.toLowerCase()) || 
      denuncia.descricao.toLowerCase().includes(busca.toLowerCase());
      
    const matchEstado = !filtroEstado || 
      denuncia.status === filtroEstado;
      
    return matchBusca && matchEstado;
  });

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy 'às' HH:mm", {
        locale: ptBR
      });
    } catch {
      return dateString;
    }
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Esta ação não poderá ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('admin.denuncias.destroy', { id }), {
          onSuccess: () => {
            Swal.fire(
              'Excluído!',
              'A denúncia foi excluída com sucesso.',
              'success'
            );
          },
          onError: () => {
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao excluir a denúncia.',
              'error'
            );
          }
        });
      }
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gerenciar Denúncias</h1>
          <Button asChild>
            <Link href={route('admin.denuncias.create')}>Nova Denúncia</Link>
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Pesquisar pelo título ou descrição"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Todos os status</option>
              <option value="pendente">Pendente</option>
              <option value="em_analise">Em Análise</option>
              <option value="resolvida">Resolvida</option>
              <option value="arquivada">Arquivada</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            {denunciasFiltradas.length} denúncia(s) encontrada(s)
          </p>
          
          <div className="flex gap-2">
            <Button variant="outline">Exportar Lista</Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Localização</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {denunciasFiltradas.map((denuncia) => (
                <tr key={denuncia.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {denuncia.titulo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {denuncia.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(denuncia.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {denuncia.localizacao}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={route('admin.denuncias.show', { id: denuncia.id })}>Ver</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={route('admin.denuncias.edit', { id: denuncia.id })}>Editar</Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(denuncia.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDenuncias;
