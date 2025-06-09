import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from '@inertiajs/react';
import { useToast } from "@/hooks/use-toast";

const FormularioDenuncia: React.FC = () => {
  const { addToast } = useToast();
  
  const form = useForm({
    titulo: '',
    descricao: '',
    localizacao: '',
    contato: '',
    status: 'pendente',
    arquivos: [] as File[],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      form.setData('arquivos', filesArray);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    form.post(route('denuncias.publicas.store'), {
      preserveScroll: true,
      forceFormData: true,
      onSuccess: () => {
        console.log('Resposta de sucesso');
        addToast({
          title: 'Sucesso!',
          description: 'Sua denúncia foi registrada com sucesso.',
          type: 'success'
        });
        form.reset();
      },
      onError: (errors) => {
        console.error('Erros do formulário:', errors);
        addToast({
          title: 'Erro',
          description: 'Ocorreu um erro ao registrar sua denúncia',
          type: 'error'
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="titulo">Título da Denúncia</Label>
        <Input
          id="titulo"
          placeholder="Ex: Buraco na Rua Principal"
          value={form.data.titulo}
          onChange={(e) => form.setData('titulo', e.target.value)}
          className={form.errors.titulo ? "border-red-500" : ""}
          required
        />
        {form.errors.titulo && (
          <p className="text-sm text-red-500">{form.errors.titulo}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição detalhada</Label>
        <Textarea
          id="descricao"
          placeholder="Descreva com detalhes o problema"
          value={form.data.descricao}
          onChange={(e) => form.setData('descricao', e.target.value)}
          className={`min-h-[150px] ${form.errors.descricao ? "border-red-500" : ""}`}
          required
        />
        {form.errors.descricao && (
          <p className="text-sm text-red-500">{form.errors.descricao}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="localizacao">Localização</Label>
        <Input
          id="localizacao"
          placeholder="Ex: Rua Principal, 123 - Bairro Centro"
          value={form.data.localizacao}
          onChange={(e) => form.setData('localizacao', e.target.value)}
          className={form.errors.localizacao ? "border-red-500" : ""}
          required
        />
        {form.errors.localizacao && (
          <p className="text-sm text-red-500">{form.errors.localizacao}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contato">Contato (opcional)</Label>
        <Input
          id="contato"
          placeholder="Email ou WhatsApp para receber atualizações"
          value={form.data.contato}
          onChange={(e) => form.setData('contato', e.target.value)}
        />
        <p className="text-sm text-gray-500">
          Seus dados de contato são opcionais e só serão usados para notificá-lo sobre o andamento da denúncia
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="arquivos">Fotos ou documentos (opcional)</Label>
        <Input
          id="arquivos"
          type="file"
          multiple
          onChange={handleFileChange}
          className="cursor-pointer"
        />
        {form.data.arquivos && form.data.arquivos.length > 0 && (
          <div className="text-sm text-gray-600">
            {form.data.arquivos.length} arquivo(s) selecionado(s)
          </div>
        )}
      </div>
      
      <Button type="submit" className="w-full" disabled={form.processing}>
        {form.processing ? "Enviando..." : "Enviar Denúncia"}
      </Button>
    </form>
  );
};

export default FormularioDenuncia;
