import { Link } from '@inertiajs/react';
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const DenunciaEnviada = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Denúncia Enviada!</h1>
          
          <p className="text-gray-600 mb-6">
            Sua denúncia foi registrada com sucesso e será analisada pela nossa equipe. 
            Se você forneceu informações de contato, você receberá atualizações sobre o andamento da sua denúncia.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/">
              <Button variant="outline">
                Voltar ao Início
              </Button>
            </Link>
            <Link href="/consultar">
              <Button>
                Consultar Denúncias
              </Button>
            </Link>
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

export default DenunciaEnviada;
