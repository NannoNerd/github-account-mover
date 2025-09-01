import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function CreateContent() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: 'post' | 'video') => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const content = formData.get('content') as string;
    const videoUrl = formData.get('videoUrl') as string;

    try {
      // Aqui você faria a chamada para o Supabase
      console.log('Creating content:', {
        title,
        description,
        category,
        content: type === 'post' ? content : undefined,
        video_url: type === 'video' ? videoUrl : undefined,
        type
      });

      toast({
        title: 'Conteúdo criado com sucesso!',
        description: `Seu ${type === 'video' ? 'vídeo' : 'post'} foi publicado.`
      });

      // Reset form
      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: 'Erro ao criar conteúdo',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
          Criar Conteúdo
        </h1>
        <p className="text-muted-foreground">
          Compartilhe seu conhecimento com a comunidade
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Novo Conteúdo</CardTitle>
          <CardDescription>
            Escolha o tipo de conteúdo que deseja criar
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="post" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="post">Artigo/Post</TabsTrigger>
              <TabsTrigger value="video">Vídeo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="post" className="space-y-6">
              <form onSubmit={(e) => handleSubmit(e, 'post')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="post-title">Título</Label>
                  <Input
                    id="post-title"
                    name="title"
                    placeholder="Digite o título do seu post"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="post-description">Descrição</Label>
                  <Textarea
                    id="post-description"
                    name="description"
                    placeholder="Breve descrição do conteúdo"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="post-category">Categoria</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engenharia">Engenharia</SelectItem>
                      <SelectItem value="crypto">Criptomoedas</SelectItem>
                      <SelectItem value="music">Música</SelectItem>
                      <SelectItem value="motivational">Motivacional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="post-content">Conteúdo</Label>
                  <Textarea
                    id="post-content"
                    name="content"
                    placeholder="Escreva o conteúdo do seu post..."
                    rows={10}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Publicando...' : 'Publicar Post'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="video" className="space-y-6">
              <form onSubmit={(e) => handleSubmit(e, 'video')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="video-title">Título</Label>
                  <Input
                    id="video-title"
                    name="title"
                    placeholder="Digite o título do seu vídeo"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="video-description">Descrição</Label>
                  <Textarea
                    id="video-description"
                    name="description"
                    placeholder="Breve descrição do vídeo"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="video-category">Categoria</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engenharia">Engenharia</SelectItem>
                      <SelectItem value="crypto">Criptomoedas</SelectItem>
                      <SelectItem value="music">Música</SelectItem>
                      <SelectItem value="motivational">Motivacional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="video-url">URL do Vídeo</Label>
                  <Input
                    id="video-url"
                    name="videoUrl"
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Cole o link do YouTube, Vimeo ou outra plataforma
                  </p>
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Publicando...' : 'Publicar Vídeo'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}