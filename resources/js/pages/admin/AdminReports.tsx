import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DenunciaStatusCount {
  status: string;
  total: number;
}

interface PageProps {
  totalDenuncias: number;
  denunciasPorStatus: DenunciaStatusCount[];
  [key: string]: unknown;
}

const AdminReports: React.FC = () => {
  const { totalDenuncias, denunciasPorStatus } = usePage<PageProps>().props;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Relatórios de Denúncias</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Denúncias</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDenuncias}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Denúncias por Status</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-700">
                {denunciasPorStatus.length > 0 ? (
                  denunciasPorStatus.map((item) => (
                    <li key={item.status} className="flex justify-between">
                      <span>{item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('_', ' ')}:</span>
                      <span>{item.total}</span>
                    </li>
                  ))
                ) : (
                  <li>Nenhum dado de status disponível.</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReports; 