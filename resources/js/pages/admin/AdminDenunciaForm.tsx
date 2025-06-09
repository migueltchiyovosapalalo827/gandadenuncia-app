import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/components/admin/AdminLayout';
import { Denuncia } from '@/types';

interface PageProps {
  denuncia: Denuncia | null;
  [key: string]: unknown;
}

const AdminDenunciaForm = () => {
  const { denuncia } = usePage<PageProps>().props;
  const isEditing = !!denuncia;

  const form = useForm({
    titulo: denuncia?.titulo || '',
    descricao: denuncia?.descricao || '',
    localizacao: denuncia?.localizacao || '',
    contato: denuncia?.contato || '',
    status: denuncia?.status || 'pendente',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      form.put(route('admin.denuncias.update', denuncia.id), {
        preserveScroll: true,
        onSuccess: () => {
          window.location.href = route('admin.denuncias.index');
        },
      });
    } else {
      form.post(route('admin.denuncias.store'), {
        preserveScroll: true,
        onSuccess: () => {
          window.location.href = route('admin.denuncias.index');
        },
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {isEditing ? 'Editar Denúncia' : 'Nova Denúncia'}
          </h1>
          <Button variant="outline" asChild>
            <Link href={route('admin.denuncias.index')}>Voltar</Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título</Label>
              <Input
                id="titulo"
                value={form.data.titulo}
                onChange={(e) => form.setData('titulo', e.target.value)}
                required
              />
              {form.errors.titulo && (
                <p className="text-sm text-red-500">{form.errors.titulo}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={form.data.descricao}
                onChange={(e) => form.setData('descricao', e.target.value)}
                required
                className="min-h-[150px]"
              />
              {form.errors.descricao && (
                <p className="text-sm text-red-500">{form.errors.descricao}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="localizacao">Localização</Label>
              <Input
                id="localizacao"
                value={form.data.localizacao}
                onChange={(e) => form.setData('localizacao', e.target.value)}
                required
              />
              {form.errors.localizacao && (
                <p className="text-sm text-red-500">{form.errors.localizacao}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contato">Contato</Label>
              <Input
                id="contato"
                value={form.data.contato}
                onChange={(e) => form.setData('contato', e.target.value)}
              />
              {form.errors.contato && (
                <p className="text-sm text-red-500">{form.errors.contato}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={form.data.status}
                onChange={(e) => form.setData('status', e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="pendente">Pendente</option>
                <option value="em_analise">Em Análise</option>
                <option value="resolvida">Resolvida</option>
                <option value="arquivada">Arquivada</option>
              </select>
              {form.errors.status && (
                <p className="text-sm text-red-500">{form.errors.status}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href={route('admin.denuncias.index')}>Cancelar</Link>
            </Button>
            <Button type="submit" disabled={form.processing}>
              {form.processing ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Criar Denúncia'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminDenunciaForm; 