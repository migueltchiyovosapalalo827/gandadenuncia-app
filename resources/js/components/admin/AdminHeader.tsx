import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

const AdminHeader = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/admin" className="text-xl font-bold text-gray-800">
                Painel Administrativo
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Button variant="outline" asChild>
              <Link href="/">Voltar ao Site</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
