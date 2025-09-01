import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Eye, Share2 } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  category: string;
  views: number;
  likes: number;
  comments: number;
  created_at: string;
  author: {
    name: string;
    avatar_url?: string;
  };
}

export default function PostView() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Mock data - em produção, buscar do Supabase
    setTimeout(() => {
      const mockPost: Post = {
        id: '2',
        title: 'Análise Estrutural com SAP2000',
        slug: 'analise-estrutural-sap2000',
        content: `# Análise Estrutural com SAP2000

## Introdução

O SAP2000 é um dos softwares mais utilizados na engenharia estrutural para análise e dimensionamento de estruturas. Neste tutorial, vamos abordar os principais conceitos e funcionalidades.

## Configuração Inicial

Primeiro, vamos configurar as unidades e sistemas de coordenadas:

1. Acesse o menu **File > New Model**
2. Selecione o template adequado
3. Configure as unidades (kN, m, C)

## Definindo Materiais

O programa oferece uma biblioteca completa de materiais:

- Concreto C25, C30, C35
- Aço CA-50, CA-60
- Madeira e outros materiais

## Criando a Geometria

Para criar a geometria da estrutura:

1. Use as ferramentas de desenho
2. Defina os nós principais
3. Conecte os elementos

## Aplicando Carregamentos

Os carregamentos podem ser:

- Permanentes (G)
- Variáveis (Q)
- Vento (W)
- Sísmicos (E)

## Executando a Análise

Após definir todos os parâmetros:

1. Execute o **Run Analysis**
2. Verifique os resultados
3. Analise os deslocamentos e esforços

## Conclusão

O SAP2000 é uma ferramenta poderosa que, quando bem utilizada, proporciona análises precisas e confiáveis para projetos estruturais.`,
        description: 'Tutorial completo sobre análise estrutural usando SAP2000',
        category: 'engenharia',
        views: 890,
        likes: 67,
        comments: 12,
        created_at: '2024-01-14T15:30:00Z',
        author: {
          name: 'Ivo Fernandes',
          avatar_url: undefined
        }
      };

      if (slug === mockPost.slug) {
        setPost(mockPost);
      }
      setLoading(false);
    }, 1000);
  }, [slug]);

  const handleLike = () => {
    setLiked(!liked);
    // Aqui você faria a atualização no Supabase
  };

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Post não encontrado</h1>
        <p className="text-muted-foreground">O post que você está procurando não existe.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="capitalize">
              {post.category}
            </Badge>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {post.views}
              </span>
              <span className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-1" />
                {post.comments}
              </span>
            </div>
          </div>
          
          <CardTitle className="text-3xl mb-4">{post.title}</CardTitle>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback>
                  {post.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(post.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={liked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
              >
                <Heart className={`h-4 w-4 mr-1 ${liked ? 'fill-current' : ''}`} />
                {post.likes + (liked ? 1 : 0)}
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-1" />
                Compartilhar
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{paragraph.slice(2)}</h1>;
              }
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-xl font-semibold mt-5 mb-3">{paragraph.slice(3)}</h2>;
              }
              if (paragraph.trim() === '') {
                return <br key={index} />;
              }
              return <p key={index} className="mb-4">{paragraph}</p>;
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}