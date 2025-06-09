import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Header from '@/components/Header';
import DetalhesDenuncia from '@/components/DetalhesDenuncia';
import { Button } from '@/components/ui/button';
import { Denuncia, ArquivoDenuncia, Comentario } from '@/types';

interface PageProps {
  denuncia: Denuncia & {
    arquivos: ArquivoDenuncia[];
    comentarios: Comentario[];
  };
  [key: string]: unknown;
}

const DetalhesDenunciaPublica = () => {
  const { denuncia } = usePage<PageProps>().props;
  
  if (!denuncia) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Denúncia não encontrada</h1>
            <p className="text-gray-600 mb-6">
              A denúncia que você está procurando não existe ou foi removida.
            </p>
            <Link href="/consultar">
              <Button>Voltar para Consulta</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link href="/consultar" className="text-brand-blue hover:underline flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Voltar para Consulta
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <DetalhesDenuncia denuncia={denuncia} />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Sistema de Denúncias Públicas. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default DetalhesDenunciaPublica;
