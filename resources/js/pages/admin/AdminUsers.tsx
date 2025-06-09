import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/admin/AdminLayout';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Swal from 'sweetalert2';

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface PaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

interface PageProps {
  users: {
    data: User[];
    links: PaginationLinks[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
  };
  [key: string]: unknown;
}

const AdminUsers: React.FC = () => {
  const { users } = usePage<PageProps>().props;
  const [busca, setBusca] = useState('');
  
  const filteredUsers = users.data.filter((user) => {
    return user.name.toLowerCase().includes(busca.toLowerCase()) ||
           user.email.toLowerCase().includes(busca.toLowerCase());
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
        router.delete(route('admin.usuarios.destroy', { user: id }), {
          onSuccess: () => {
            Swal.fire(
              'Excluído!',
              'O usuário foi excluído com sucesso.',
              'success'
            );
          },
          onError: () => {
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao excluir o usuário.',
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
          <h1 className="text-2xl font-bold">Gerenciar Usuários</h1>
          <Button asChild>
            <Link href={route('admin.usuarios.create')}>Novo Usuário</Link>
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <Input
            placeholder="Pesquisar por nome ou email"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data de Criação</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={route('admin.usuarios.edit', { user: user.id })}>Editar</Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(user.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {users.last_page > 1 && (
          <div className="flex justify-center mt-4">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              {users.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url || '#'}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium 
                    ${link.active ? 'z-10 bg-primary-foreground border-primary text-primary-foreground' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}
                    ${link.url === null ? 'cursor-not-allowed opacity-50' : ''}
                    ${index === 0 ? 'rounded-l-md' : ''}
                    ${index === users.links.length - 1 ? 'rounded-r-md' : ''}
                  `}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </nav>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers; 