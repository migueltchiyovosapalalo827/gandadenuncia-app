
import React from 'react';
import Header from '@/components/Header';
import FormularioDenuncia from '@/components/FormularioDenuncia';

const NovaDenuncia = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Registrar Nova Denúncia</h1>
          <p className="text-gray-600 mb-6">
            Preencha os detalhes da sua denúncia abaixo. Quanto mais informações você fornecer, 
            mais rápido poderemos analisar e resolver o problema.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <FormularioDenuncia />
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

export default NovaDenuncia;
