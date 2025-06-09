import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Denuncia, EstadoDenuncia } from '@/types';

const statusColors = {
  [EstadoDenuncia.Nova]: 'bg-yellow-100 text-yellow-800',
  [EstadoDenuncia.EmAnalise]: 'bg-blue-100 text-blue-800',
  [EstadoDenuncia.Resolvida]: 'bg-green-100 text-green-800',
  [EstadoDenuncia.Arquivada]: 'bg-gray-100 text-gray-800'
};

const Denuncias = () => {
  const { denuncias = [] } = (usePage().props as unknown as { denuncias?: Denuncia[] });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('');

  const filteredDenuncias = denuncias.filter(denuncia =>
    denuncia.titulo.toLowerCase().includes(search.toLowerCase()) ||
    denuncia.descricao.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Denúncias</h1>
        <Button asChild>
          <Link href="/nova-denuncia">Nova Denúncia</Link>
        </Button>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Buscar denúncias..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            <SelectItem value={EstadoDenuncia.Nova}>Pendente</SelectItem>
            <SelectItem value={EstadoDenuncia.EmAnalise}>Em Análise</SelectItem>
            <SelectItem value={EstadoDenuncia.Resolvida}>Resolvida</SelectItem>
            <SelectItem value={EstadoDenuncia.Arquivada}>Arquivada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDenuncias.map((denuncia) => (
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
                <Link href={`/denuncias/${denuncia.id}`}>Ver detalhes</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredDenuncias.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhuma denúncia encontrada.</p>
        </div>
      )}
    </div>
  );
} 

export default Denuncias;