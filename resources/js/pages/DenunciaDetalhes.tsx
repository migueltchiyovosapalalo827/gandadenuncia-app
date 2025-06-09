import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Denuncia } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PageProps {
  denuncia: Denuncia;
  [key: string]: unknown;
}

const DenunciaDetalhes = () => {
  const { denuncia } = usePage<PageProps>().props;

  if (!denuncia) {
    return <div>Denúncia não encontrada</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/denuncias">
        <Button variant="outline" className="mb-6">
          Voltar para lista de denúncias
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>{denuncia.titulo}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Descrição</h3>
              <p className="text-gray-600">{denuncia.descricao}</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Localização</h3>
              <p className="text-gray-600">{denuncia.localizacao}</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Status</h3>
              <p className="text-gray-600">{denuncia.status}</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Data de Criação</h3>
              <p className="text-gray-600">
                {new Date(denuncia.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DenunciaDetalhes;