import React, { useState } from 'react';
import { Denuncia, EstadoDenuncia } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

interface GerenciamentoDenunciaProps {
  denuncia: Denuncia;
}

const GerenciamentoDenuncia: React.FC<GerenciamentoDenunciaProps> = ({
  denuncia,
}) => {
  const [novoEstado, setNovoEstado] = useState<EstadoDenuncia>(denuncia.status);
  const [novoComentario, setNovoComentario] = useState('');
  const [tipoNotificacao, setTipoNotificacao] = useState('email');
  
  const handleUpdateStatus = () => {
    router.put(route('admin.denuncias.update', { id: denuncia.id }), {
      status: novoEstado,
    }, {
      onSuccess: () => {
        Swal.fire('Status Atualizado', 'O status da denúncia foi atualizado com sucesso.', 'success');
      },
      onError: (errors) => {
        Swal.fire('Erro', 'Ocorreu um erro ao atualizar o status.', 'error');
        console.error(errors);
      }
    });
  };
  
  const handleAddComentario = () => {
    if (!novoComentario.trim()) {
      Swal.fire('Erro', 'O comentário não pode estar vazio.', 'error');
      return;
    }
    
    router.post(route('admin.comentarios.store', { id: denuncia.id }), {
      comentario: novoComentario,
    }, {
      onSuccess: () => {
        Swal.fire('Comentário Adicionado', 'O comentário foi adicionado com sucesso.', 'success');
        setNovoComentario('');
      },
      onError: (errors) => {
        Swal.fire('Erro', 'Ocorreu um erro ao adicionar o comentário.', 'error');
        console.error(errors);
      }
    });
  };
  
  const handleSendNotification = () => {
    if (!denuncia.contato) {
      Swal.fire('Erro', 'Esta denúncia não possui informações de contato.', 'error');
      return;
    }
    
    // Lógica para enviar notificação (pode ser implementada no backend)
    Swal.fire('Notificação Enviada', 'A notificação foi enviada com sucesso (funcionalidade mock).', 'info');
  };
  
  return (
    <div className="border-t pt-6 mt-8">
      <h3 className="text-lg font-semibold mb-4">Gerenciar Denúncia</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2">Atualizar Status</h4>
          <div className="flex gap-4">
            <div className="w-full max-w-xs">
              <Select value={novoEstado} onValueChange={(value) => setNovoEstado(value as EstadoDenuncia)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={EstadoDenuncia.Nova}>Nova</SelectItem>
                  <SelectItem value={EstadoDenuncia.EmAnalise}>Em Análise</SelectItem>
                  <SelectItem value={EstadoDenuncia.Resolvida}>Resolvida</SelectItem>
                  <SelectItem value={EstadoDenuncia.Arquivada}>Arquivada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleUpdateStatus}>Atualizar Status</Button>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Adicionar Comentário</h4>
          <Textarea
            placeholder="Digite um comentário ou atualização sobre esta denúncia..."
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            className="mb-2"
            rows={3}
          />
          <Button onClick={handleAddComentario}>Adicionar Comentário</Button>
        </div>
        
        {denuncia.contato && (
          <div>
            <h4 className="font-medium mb-2">Enviar Notificação</h4>
            <div className="flex gap-4 items-center">
              <div className="w-full max-w-xs">
                <Select value={tipoNotificacao} onValueChange={setTipoNotificacao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o canal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">E-mail</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSendNotification}>Enviar Notificação</Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              A notificação será enviada para: {denuncia.contato}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GerenciamentoDenuncia;
