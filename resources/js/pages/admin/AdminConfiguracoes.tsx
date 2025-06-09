
import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const AdminConfiguracoes = () => {
  const [nomeInstitucional, setNomeInstitucional] = useState('Sistema de Denúncias Públicas');
  const [emailContato, setEmailContato] = useState('contato@sistema.com');
  const [emailNotificacoes, setEmailNotificacoes] = useState('notificacoes@sistema.com');
  const [notificacoesEmail, setNotificacoesEmail] = useState(true);
  const [notificacoesWhatsapp, setNotificacoesWhatsapp] = useState(true);
  
  const handleSaveGeneral = () => {
    toast.success('Configurações gerais salvas com sucesso!');
  };
  
  const handleSaveNotifications = () => {
    toast.success('Configurações de notificação salvas com sucesso!');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Configurações do Sistema</h1>
          
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações Gerais</CardTitle>
                  <CardDescription>
                    Defina as configurações básicas do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nomeInstitucional">Nome Institucional</Label>
                    <Input
                      id="nomeInstitucional"
                      value={nomeInstitucional}
                      onChange={(e) => setNomeInstitucional(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emailContato">Email de Contato</Label>
                    <Input
                      id="emailContato"
                      type="email"
                      value={emailContato}
                      onChange={(e) => setEmailContato(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveGeneral}>Salvar Alterações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Notificação</CardTitle>
                  <CardDescription>
                    Gerencie como as notificações são enviadas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Notificações por Email</h4>
                        <p className="text-sm text-gray-500">Enviar atualizações por email</p>
                      </div>
                      <Switch
                        checked={notificacoesEmail}
                        onCheckedChange={setNotificacoesEmail}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Notificações por WhatsApp</h4>
                        <p className="text-sm text-gray-500">Enviar atualizações por WhatsApp</p>
                      </div>
                      <Switch
                        checked={notificacoesWhatsapp}
                        onCheckedChange={setNotificacoesWhatsapp}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emailNotificacoes">Email para Notificações</Label>
                    <Input
                      id="emailNotificacoes"
                      type="email"
                      value={emailNotificacoes}
                      onChange={(e) => setEmailNotificacoes(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveNotifications}>Salvar Preferências</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Gestão de Usuários</CardTitle>
                  <CardDescription>
                    Gerencie os usuários com acesso ao sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-12 text-gray-500">
                    A gestão de usuários completa estará disponível na próxima versão do sistema.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminConfiguracoes;
