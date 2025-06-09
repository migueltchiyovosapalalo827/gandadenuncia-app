import React from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Denuncia } from '@/types';

type StatusType = 'pendente' | 'em_analise' | 'resolvida' | 'arquivada';

const statusColors: Record<StatusType, string> = {
  pendente: 'bg-yellow-100 text-yellow-800',
  em_analise: 'bg-blue-100 text-blue-800',
  resolvida: 'bg-green-100 text-green-800',
  arquivada: 'bg-gray-100 text-gray-800'
};

interface ListaDenunciasProps {
  denuncias: Denuncia[];
  isAdmin?: boolean;
}

const ListaDenuncias: React.FC<ListaDenunciasProps> = ({ denuncias, isAdmin = false }) => {
  if (!denuncias || denuncias.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhuma denúncia encontrada.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {denuncias.map((denuncia) => (
        <Card key={denuncia.id}>
          <CardHeader>
            <CardTitle>{denuncia.titulo}</CardTitle>
            <CardDescription>
              <Badge className={statusColors[denuncia.status]}>
                {denuncia.status}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 line-clamp-3">
              {denuncia.descricao}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href={isAdmin ? `/admin/denuncias/${denuncia.id}` : `/denuncias/${denuncia.id}`}>
                Ver detalhes
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ListaDenuncias;
