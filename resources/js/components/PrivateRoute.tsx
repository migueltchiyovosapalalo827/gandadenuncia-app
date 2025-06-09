import { usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import { User } from '@/types';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { auth } = usePage().props as { auth: { user: User | null } };

  if (!auth.user) {
    window.location.href = '/login';
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute; 