import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '@/components/Header';
import ListaDenuncias from '@/components/ListaDenuncias';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Denuncia } from '@/types';

const ConsultarDenuncias = () => {
  const { denuncias = [] } = (usePage().props as unknown as { denuncias?: Denuncia[] });
  const [busca, setBusca] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  const denunciasFiltradas = denuncias.filter(denuncia => {
    const matchBusca = denuncia.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                      denuncia.descricao.toLowerCase().includes(busca.toLowerCase());
    const matchEstado = filtroEstado === 'todos' || denuncia.status === filtroEstado;
    return matchBusca && matchEstado;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <Input
                placeholder="Pesquisar pelo título ou descrição"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="pendente">Novas</SelectItem>
                <SelectItem value="em_analise">Em Análise</SelectItem>
                <SelectItem value="resolvida">Resolvidas</SelectItem>
                <SelectItem value="arquivada">Arquivadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600">
            {denunciasFiltradas.length} denúncia(s) encontrada(s)
          </p>
        </div>
        
        <ListaDenuncias denuncias={denunciasFiltradas} />
      </main>
      
      <footer className="bg-gray-100 border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Sistema de Denúncias Públicas. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default ConsultarDenuncias;
