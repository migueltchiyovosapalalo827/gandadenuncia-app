import React from 'react';
import { Denuncia, ArquivoDenuncia, Comentario } from '@/types';
import StatusDenuncia from './StatusDenuncia';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DetalhesDenunciaProps {
  denuncia: Denuncia & {
    arquivos: ArquivoDenuncia[];
    comentarios: Comentario[];
  };
}

const DetalhesDenuncia: React.FC<DetalhesDenunciaProps> = ({
  denuncia,
}) => {
  // Comentário temporário para forçar a reavaliação do TypeScript
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
        locale: ptBR
      });
    } catch {
      return dateString;
    }
  };

  if (!denuncia) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Denúncia não encontrada</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{denuncia.titulo}</h2>
            <StatusDenuncia estado={denuncia.status} />
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-700 whitespace-pre-line">{denuncia.descricao}</p>
            <div className="mt-4 text-sm text-gray-500">
              Registrada em {formatDate(denuncia.created_at)}
            </div>
          </div>

          {denuncia.contato && (
            <div>
              <h3 className="text-md font-semibold mb-2">Contato</h3>
              <p className="text-gray-600">{denuncia.contato}</p>
            </div>
          )}

          {denuncia.arquivos.length > 0 && (
            <div>
              <h3 className="text-md font-semibold mb-2">Arquivos Anexados</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {denuncia.arquivos.map((arquivo) => (
                  <div key={arquivo.id} className="border rounded-md p-2">
                    <p className="text-sm truncate">{arquivo.nome_arquivo}</p>
                    {/* Aqui pode ser exibida uma miniatura se for imagem */}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-md font-semibold mb-2">Atualizações</h3>
            {denuncia.comentarios.length === 0 ? (
              <p className="text-gray-500">Ainda não há atualizações para esta denúncia.</p>
            ) : (
              <div className="space-y-4">
                {denuncia.comentarios.map((comentario) => (
                  <Card key={comentario.id}>
                    <CardContent className="pt-4">
                      <p className="text-sm">{comentario.comentario}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatDate(comentario.data)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesDenuncia;
