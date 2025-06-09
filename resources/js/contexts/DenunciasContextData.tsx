import React, { createContext, useContext } from 'react';
import { Denuncia } from '../types';

interface DenunciasContextData {
  denuncias: Denuncia[];
}

const DenunciasContext = createContext<DenunciasContextData>({ denuncias: [] });

export const DenunciasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Aqui você pode adicionar a lógica para buscar as denúncias do backend
  const denuncias: Denuncia[] = [];

  return (
    <DenunciasContext.Provider value={{ denuncias }}>
      {children}
    </DenunciasContext.Provider>
  );
};

export const useDenuncias = () => {
  const context = useContext(DenunciasContext);
  if (!context) {
    throw new Error('useDenuncias deve ser usado dentro de um DenunciasProvider');
  }
  return context;
}; 