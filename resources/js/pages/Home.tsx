import { Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Denuncia } from '@/types';
import AdminLayout from '@/components/admin/AdminLayout';

type StatusType = 'pendente' | 'em_analise' | 'resolvida' | 'arquivada';

const statusColors: Record<StatusType, string> = {
  pendente: 'bg-yellow-100 text-yellow-800',
  em_analise: 'bg-blue-100 text-blue-800',
  resolvida: 'bg-green-100 text-green-800',
  arquivada: 'bg-gray-100 text-gray-800'
};

interface PageProps {
  denuncias: Denuncia[];
  [key: string]: unknown;
}

const Home = () => {
  const { denuncias } = usePage<PageProps>().props;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Últimas Denúncias</h1>
          <Button asChild>
            <Link href="/admin/nova-denuncia">Nova Denúncia</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {denuncias?.map((denuncia) => (
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
                  <Link href={`/admin/denuncias/${denuncia.id}`}>Ver detalhes</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {(!denuncias || denuncias.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma denúncia encontrada.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Home;    