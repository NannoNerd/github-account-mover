import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Eye, Share2, Play } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  slug: string;
  description: string;
  video_url: string;
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

export default function VideoView() {
  const { slug } = useParams<{ slug: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Mock data - em produção, buscar do Supabase
    setTimeout(() => {
      const mockVideo: Video = {
        id: '1',
        title: 'Introdução ao AutoCAD Civil 3D',
        slug: 'introducao-autocad-civil-3d',
        description: 'Aprenda os fundamentos do AutoCAD Civil 3D para projetos de engenharia civil. Neste vídeo, você vai aprender a navegar pela interface, criar superfícies, trabalhar com alinhamentos e muito mais.',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        category: 'engenharia',
        views: 1250,
        likes: 89,
        comments: 23,
        created_at: '2024-01-15T10:00:00Z',
        author: {
          name: 'Ivo Fernandes',
          avatar_url: undefined
        }
      };

      if (slug === mockVideo.slug) {
        setVideo(mockVideo);
      }
      setLoading(false);
    }, 1000);
  }, [slug]);

  const handleLike = () => {
    setLiked(!liked);
    // Aqui você faria a atualização no Supabase
  };

  const handleShare = () => {
    if (navigator.share && video) {
      navigator.share({
        title: video.title,
        text: video.description,
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
          <div className="aspect-video bg-muted rounded" />
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-32 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="max-w-4xl mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Vídeo não encontrado</h1>
        <p className="text-muted-foreground">O vídeo que você está procurando não existe.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      {/* Video Player */}
      <Card>
        <CardContent className="p-0">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
            {/* Placeholder for video player */}
            <div className="text-center">
              <Play className="h-16 w-16 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Player de vídeo aqui</p>
              <p className="text-sm text-muted-foreground mt-2">
                URL: {video.video_url}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="capitalize">
              {video.category}
            </Badge>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {video.views}
              </span>
              <span className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-1" />
                {video.comments}
              </span>
            </div>
          </div>
          
          <CardTitle className="text-2xl mb-4">{video.title}</CardTitle>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback>
                  {video.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{video.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(video.created_at).toLocaleDateString('pt-BR')}
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
                {video.likes + (liked ? 1 : 0)}
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-1" />
                Compartilhar
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sobre este vídeo</h3>
            <p className="text-muted-foreground leading-relaxed">
              {video.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Related Videos */}
      <Card>
        <CardHeader>
          <CardTitle>Vídeos Relacionados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex space-x-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="w-32 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded flex items-center justify-center flex-shrink-0">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium line-clamp-2 mb-1">
                    Vídeo relacionado {i}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    1.2k visualizações
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}