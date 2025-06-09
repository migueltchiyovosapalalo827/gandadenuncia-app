import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import Header from '@/components/Header';
import { Denuncia } from '@/types';

interface PageProps {
  denuncias: Denuncia[];
  estatisticas: {
    totalDenuncias: number;
    denunciasEmAnalise: number;
    denunciasResolvidas: number;
  };
  [key: string]: unknown;
}

const Index = () => {
  const { denuncias, estatisticas } = usePage<PageProps>().props;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-brand-blue mb-6">Sistema de Denúncias Públicas</h1>
          <p className="text-xl text-gray-600 mb-8">
            Ajude a melhorar sua cidade. Faça denúncias de problemas urbanos, 
            infraestrutura, serviços públicos e acompanhe a resolução.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/nova-denuncia">
              <Button size="lg" className="w-full sm:w-auto">
                Fazer uma denúncia
              </Button>
            </Link>
            <Link href="/consultar">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Consultar denúncias
              </Button>
            </Link>
          </div>
        </section>
        
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Como funciona</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-blue text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Registre a denúncia</h3>
              <p className="text-gray-600">
                Preencha o formulário com detalhes sobre o problema e envie fotos se possível
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-blue text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Acompanhe o progresso</h3>
              <p className="text-gray-600">
                Receba atualizações sobre o status da sua denúncia por email ou WhatsApp
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-blue text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Problema resolvido</h3>
              <p className="text-gray-600">
                Nossa equipe trabalha para resolver o problema e você é notificado quando concluído
              </p>
            </div>
          </div>
        </section>
        
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Estatísticas</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-brand-blue mb-2">{estatisticas.totalDenuncias}</div>
              <div className="text-gray-600">Denúncias Registradas</div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">{estatisticas.denunciasEmAnalise}</div>
              <div className="text-gray-600">Em Análise</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">{estatisticas.denunciasResolvidas}</div>
              <div className="text-gray-600">Problemas Resolvidos</div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-100 border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Sistema de Denúncias Públicas. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
