import React from 'react';
import { usePage } from '@inertiajs/react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Denuncia, ArquivoDenuncia, Comentario } from '@/types';
import GerenciamentoDenuncia from '@/components/admin/GerenciamentoDenuncia';
import DetalhesDenuncia from '@/components/DetalhesDenuncia';

interface PageProps {
  denuncia: Denuncia & {
    arquivos: ArquivoDenuncia[];
    comentarios: Comentario[];
  };
  [key: string]: unknown;
}

const AdminDetalhesDenuncia: React.FC = () => {
  const { denuncia } = usePage<PageProps>().props;

  if (!denuncia) {
    return (
      <AdminLayout>
        <div className="text-center py-10">
          <p className="text-gray-500">Denúncia não encontrada</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <DetalhesDenuncia
            denuncia={denuncia}
          />
          <GerenciamentoDenuncia
            denuncia={denuncia}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDetalhesDenuncia;
