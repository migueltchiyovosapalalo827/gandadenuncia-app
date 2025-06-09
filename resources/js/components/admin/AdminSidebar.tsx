import React from 'react';
import { Link } from '@inertiajs/react';
import { Home, AlertCircle, Users, BarChart2, LogOutIcon } from 'lucide-react';

interface MenuItem {
  path: string;
  icon: React.ElementType;
  label: string;
  method?: 'get' | 'post' | 'put' | 'delete';
}

const AdminSidebar = () => {
  const menuItems: MenuItem[] = [
    { path: '/admin', icon: Home, label: 'Dashboard' },
    { path: '/admin/denuncias', icon: AlertCircle, label: 'Denúncias' },
    { path: '/admin/usuarios', icon: Users, label: 'Usuários' },
    { path: '/admin/relatorios', icon: BarChart2, label: 'Relatórios' },
    { path: '/logout', icon: LogOutIcon, label: 'Sair', method: 'post' },
  ];

  return (
    <aside className="w-64 bg-white border-r h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6">Ganda Denúncia</h1>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              method={item.method || 'get'}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
