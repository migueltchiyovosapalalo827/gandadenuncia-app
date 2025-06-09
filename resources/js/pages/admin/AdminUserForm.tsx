import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/components/admin/AdminLayout';

interface User {
  id: number;
  name: string;
  email: string;
  role?: number;
}

interface PageProps {
  user: User | null;
  [key: string]: unknown;
}

const AdminUserForm: React.FC = () => {
  const { user } = usePage<PageProps>().props;
  const isEditing = !!user;

  const form = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    password_confirmation: '',
    role: user?.role ?? 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      form.put(route('admin.usuarios.update', { user: user.id }), {
        preserveScroll: true,
        onSuccess: () => {
          window.location.href = route('admin.usuarios.index');
        },
      });
    } else {
      form.post(route('admin.usuarios.store'), {
        preserveScroll: true,
        onSuccess: () => {
          window.location.href = route('admin.usuarios.index');
        },
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {isEditing ? 'Editar Usuário' : 'Novo Usuário'}
          </h1>
          <Button variant="outline" asChild>
            <Link href={route('admin.usuarios.index')}>Voltar</Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={form.data.name}
                onChange={(e) => form.setData('name', e.target.value)}
                required
              />
              {form.errors.name && (
                <p className="text-sm text-red-500">{form.errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.data.email}
                onChange={(e) => form.setData('email', e.target.value)}
                required
              />
              {form.errors.email && (
                <p className="text-sm text-red-500">{form.errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={form.data.password}
                onChange={(e) => form.setData('password', e.target.value)}
                required={!isEditing}
              />
              {form.errors.password && (
                <p className="text-sm text-red-500">{form.errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Confirmar Senha</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={form.data.password_confirmation}
                onChange={(e) => form.setData('password_confirmation', e.target.value)}
                required={!isEditing}
              />
              {form.errors.password_confirmation && (
                <p className="text-sm text-red-500">{form.errors.password_confirmation}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Tipo de Usuário</Label>
              <select
                id="role"
                value={form.data.role}
                onChange={(e) => form.setData('role', parseInt(e.target.value))}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value={0}>Usuário Comum (0)</option>
                <option value={1}>Administrador (1)</option>
              </select>
              {form.errors.role && (
                <p className="text-sm text-red-500">{form.errors.role}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href={route('admin.usuarios.index')}>Cancelar</Link>
            </Button>
            <Button type="submit" disabled={form.processing}>
              {form.processing ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Criar Usuário'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminUserForm; 