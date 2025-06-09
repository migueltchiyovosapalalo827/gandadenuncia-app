import React from 'react';
import { Badge } from '@/components/ui/badge';

type StatusType = 'pendente' | 'em_analise' | 'resolvida' | 'arquivada';

const statusColors: Record<StatusType, string> = {
  pendente: 'bg-yellow-100 text-yellow-800',
  em_analise: 'bg-blue-100 text-blue-800',
  resolvida: 'bg-green-100 text-green-800',
  arquivada: 'bg-gray-100 text-gray-800'
};

const statusLabels: Record<StatusType, string> = {
  pendente: 'Pendente',
  em_analise: 'Em Análise',
  resolvida: 'Resolvida',
  arquivada: 'Arquivada'
};

interface StatusDenunciaProps {
  estado: StatusType;
}

const StatusDenuncia: React.FC<StatusDenunciaProps> = ({ estado }) => {
  return (
    <Badge className={statusColors[estado]}>
      {statusLabels[estado]}
    </Badge>
  );
};

export default StatusDenuncia;
