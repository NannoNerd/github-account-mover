import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Eye, Calendar, Play } from 'lucide-react';
import DOMPurify from 'dompurify';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  cover_image_url: string | null;
  published: boolean;
  views_count: number;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  slug: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
  youtube_url: string;
  youtube_video_id: string;
  thumbnail_url: string | null;
  published: boolean;
  views_count: number;
  likes_count: number;
  comments_count: number;
  duration?: string;
  created_at: string;
  updated_at: string;
  slug: string;
}

export default function Noticias() {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState<Post[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      
      // Load published posts
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (postsError) {
        console.error('Erro ao carregar posts:', postsError);
      } else {
        setPosts(postsData || []);
      }

      // Load published videos
      const { data: videosData, error: videosError } = await supabase
        .from('videos')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (videosError) {
        console.error('Erro ao carregar vídeos:', videosError);
      } else {
        setVideos(videosData || []);
      }
    } catch (error) {
      console.error('Erro geral ao carregar conteúdo:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'engenharia': return 'bg-orange-500';
      case 'crypto': return 'bg-yellow-500';
      case 'motivacional': return 'bg-green-500';
      case 'music': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="relative py-16 text-center bg-gradient-to-br from-background via-background/95 to-primary/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Notícias & Conteúdo
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Carregando conteúdo...
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 text-center bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Notícias & Conteúdo
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Fique por dentro das últimas novidades em engenharia, tecnologia, 
            criptomoedas e muito mais.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="posts" className="text-lg py-3">
                Posts & Artigos
              </TabsTrigger>
              <TabsTrigger value="videos" className="text-lg py-3">
                Vídeos
              </TabsTrigger>
            </TabsList>

            {/* Posts Tab */}
            <TabsContent value="posts" className="space-y-8">
            {/* Featured Post */}
            {posts.filter(post => posts.indexOf(post) === 0).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={post.cover_image_url || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop&crop=center"} 
                      alt={post.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-primary text-white">
                        Destaque
                      </Badge>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-3">
                      {post.title}
                    </h2>
                    <div 
                      className="text-muted-foreground mb-4"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.excerpt) }}
                    />
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.created_at).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {post.views_count.toLocaleString()}
                      </div>
                    </div>
                    <Link to={`/post/${post.slug}`}>
                      <Button className="w-full md:w-auto">
                        Ler Artigo Completo
                      </Button>
                    </Link>
                    </div>
                  </div>
                </Card>
              ))}

            {/* Regular Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(1).map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.cover_image_url || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop&crop=center"} 
                      alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-primary text-white text-xs">
                        Post
                      </Badge>
                    </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                    <div 
                      className="text-sm text-muted-foreground mb-3 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.excerpt) }}
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.created_at).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.views_count.toLocaleString()}
                      </div>
                      </div>
                    <Link to={`/post/${post.slug}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Ler Mais
                      </Button>
                    </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-8">
            {/* Featured Video */}
            {videos.filter(video => videos.indexOf(video) === 0).map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="md:flex">
                  <div className="md:w-1/2 relative">
                    <img 
                      src={video.thumbnail_url || `https://img.youtube.com/vi/${video.youtube_video_id}/maxresdefault.jpg`} 
                      alt={video.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Button size="lg" className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                          <Play className="h-8 w-8 text-white" />
                        </Button>
                      </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {video.duration || "N/A"}
                    </div>
                  </div>
                  <div className="md:w-1/2 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-primary text-white">
                        Vídeo
                      </Badge>
                      <Badge variant="outline">Destaque</Badge>
                    </div>
                      <h2 className="text-2xl font-bold text-foreground mb-3">
                        {video.title}
                      </h2>
                    <div 
                      className="text-muted-foreground mb-4"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(video.description) }}
                    />
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(video.created_at).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {video.views_count.toLocaleString()}
                      </div>
                      </div>
                    <Link to={`/video/${video.slug}`}>
                      <Button className="w-full md:w-auto">
                        <Play className="h-4 w-4 mr-2" />
                        Assistir Vídeo
                      </Button>
                    </Link>
                    </div>
                  </div>
                </Card>
              ))}

            {/* Regular Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.slice(1).map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={video.thumbnail_url || `https://img.youtube.com/vi/${video.youtube_video_id}/maxresdefault.jpg`} 
                      alt={video.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <Button size="sm" className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                          <Play className="h-5 w-5 text-white" />
                        </Button>
                      </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {video.duration || "N/A"}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-primary text-white text-xs">
                        Vídeo
                      </Badge>
                    </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                    <div 
                      className="text-sm text-muted-foreground mb-3 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(video.description) }}
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(video.created_at).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {video.views_count.toLocaleString()}
                      </div>
                      </div>
                    <Link to={`/video/${video.slug}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Play className="h-3 w-3 mr-2" />
                        Assistir
                      </Button>
                    </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
          </TabsContent>
        </Tabs>

        {/* Empty state messages */}
        {posts.length === 0 && videos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum conteúdo publicado ainda.
            </p>
          </div>
        )}
      </div>
    </section>
  </div>
);
}