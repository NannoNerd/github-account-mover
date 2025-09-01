import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Eye, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  content?: string;
  description?: string;
  cover_image_url?: string;
  type: 'post' | 'video';
  category: string;
  views: number;
  likes: number;
  comments: number;
  created_at: string;
}

const Feed = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'engenharia';
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - em produção, isso viria do Supabase
  const mockContents: ContentItem[] = [
    {
      id: '1',
      title: 'Introdução ao AutoCAD Civil 3D',
      slug: 'introducao-autocad-civil-3d',
      description: 'Aprenda os fundamentos do AutoCAD Civil 3D para projetos de engenharia civil',
      cover_image_url: '/placeholder-image.jpg',
      type: 'video',
      category: 'engenharia',
      views: 1250,
      likes: 89,
      comments: 23,
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'Análise Estrutural com SAP2000',
      slug: 'analise-estrutural-sap2000',
      description: 'Tutorial completo sobre análise estrutural usando SAP2000',
      content: 'Conteúdo completo sobre análise estrutural...',
      type: 'post',
      category: 'engenharia',
      views: 890,
      likes: 67,
      comments: 12,
      created_at: '2024-01-14T15:30:00Z'
    }
  ];

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      const filteredContents = mockContents.filter(content => content.category === category);
      setContents(filteredContents);
      setLoading(false);
    }, 1000);
  }, [category]);

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'engenharia': return 'Engenharia';
      case 'crypto': return 'Criptomoedas';
      case 'music': return 'Música';
      case 'motivational': return 'Motivacional';
      default: return 'Conteúdo';
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  if (loading) {
    return (
      <div className="space-y-6 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Carregando {getCategoryTitle(category)}...</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <Card>
                <div className="aspect-video bg-muted rounded-t-lg" />
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
          {getCategoryTitle(category)}
        </h1>
        <p className="text-muted-foreground">
          Conteúdo especializado em {getCategoryTitle(category).toLowerCase()}
        </p>
      </div>

      {contents.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Em breve!</h2>
          <p className="text-muted-foreground">
            Estamos preparando conteúdo incrível sobre {getCategoryTitle(category).toLowerCase()}.
          </p>
          <Button asChild className="mt-4">
            <Link to="/?category=engenharia">Ver Engenharia</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contents.map((content) => (
            <Card key={content.id} className="group hover:shadow-lg transition-all duration-300 hover:shadow-primary/20">
              <div className="relative">
                {content.cover_image_url && (
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                    {content.type === 'video' ? (
                      <Play className="h-12 w-12 text-primary" />
                    ) : (
                      <div className="text-primary font-bold text-lg">POST</div>
                    )}
                  </div>
                )}
                <Badge 
                  variant={content.type === 'video' ? 'default' : 'secondary'}
                  className="absolute top-2 right-2"
                >
                  {content.type === 'video' ? 'Vídeo' : 'Post'}
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {content.title}
                </CardTitle>
                {content.description && (
                  <CardDescription className="line-clamp-2">
                    {content.description}
                  </CardDescription>
                )}
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {formatViews(content.views)}
                    </span>
                    <span className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {content.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {content.comments}
                    </span>
                  </div>
                </div>
                
                <Button asChild className="w-full">
                  <Link to={`/${content.type}/${content.slug}`}>
                    {content.type === 'video' ? 'Assistir' : 'Ler'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;