import React from 'react';
import { Link } from '@inertiajs/react';
import { Bell, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { usuario, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-brand-blue">
          Ganda Denúncia
        </Link>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-600">Olá, {usuario?.nome}</span>
              <Link href="/admin/notificacoes">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Entrar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
