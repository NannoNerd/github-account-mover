import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, Eye, Play, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import heroEngineering from '@/assets/hero-engineering-bg.jpg';

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  content?: string;
  description?: string;
  excerpt?: string;
  cover_image_url?: string;
  thumbnail_url?: string;
  youtube_url?: string;
  type: 'post' | 'video';
  category_id: string;
  category_name?: string;
  views_count: number;
  likes_count: number;
  comments_count: number;
  created_at: string;
  published: boolean;
}

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('todos');
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [filteredContents, setFilteredContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch content from database
  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true);
      try {
        // Buscar posts
        const { data: posts } = await supabase
          .from('posts')
          .select(`
            id,
            title,
            slug,
            excerpt,
            cover_image_url,
            views_count,
            likes_count,
            comments_count,
            created_at,
            published,
            category_id,
            categories(name)
          `)
          .eq('published', true)
          .order('created_at', { ascending: false });

        // Buscar vídeos
        const { data: videos } = await supabase
          .from('videos')
          .select(`
            id,
            title,
            slug,
            description,
            thumbnail_url,
            youtube_url,
            views_count,
            likes_count,
            comments_count,
            created_at,
            published,
            category_id,
            categories(name)
          `)
          .eq('published', true)
          .order('created_at', { ascending: false });

        // Combinar e formatar dados
        const allContent: ContentItem[] = [
          ...(posts || []).map(post => ({
            ...post,
            type: 'post' as const,
            category_name: post.categories?.name || '',
            description: post.excerpt,
            cover_image_url: post.cover_image_url
          })),
          ...(videos || []).map(video => ({
            ...video,
            type: 'video' as const,
            category_name: video.categories?.name || '',
            cover_image_url: video.thumbnail_url
          }))
        ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        setContents(allContent);
        setFilteredContents(allContent);
      } catch (error) {
        console.error('Erro ao buscar conteúdos:', error);
        setContents([]);
        setFilteredContents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  // Filter content based on search and active tab
  useEffect(() => {
    let filtered = contents;

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by tab
    if (activeTab !== 'todos') {
      filtered = filtered.filter(item => item.type === activeTab);
    }

    setFilteredContents(filtered);
  }, [contents, searchTerm, activeTab]);

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroEngineering})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative container mx-auto text-center text-white">
          <h1 className="text-6xl font-bold mb-6">
            NOTÍCIAS
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Fique por dentro das últimas novidades
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar conteúdo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg bg-white/90 border-0 rounded-xl"
              />
            </div>
          </div>

          {/* Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/80 rounded-xl border border-slate-600">
              <TabsTrigger value="todos" className="text-white data-[state=active]:bg-cyan-400 data-[state=active]:text-slate-900">
                Todos
              </TabsTrigger>
              <TabsTrigger value="post" className="text-white data-[state=active]:bg-cyan-400 data-[state=active]:text-slate-900">
                Posts
              </TabsTrigger>
              <TabsTrigger value="video" className="text-white data-[state=active]:bg-cyan-400 data-[state=active]:text-slate-900">
                Vídeos
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Content Feed */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="container mx-auto">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <Card className="bg-slate-800 border-slate-700">
                    <div className="aspect-video bg-slate-700 rounded-t-lg" />
                    <CardHeader>
                      <div className="h-4 bg-slate-700 rounded w-3/4" />
                      <div className="h-3 bg-slate-700 rounded w-1/2" />
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
          ) : filteredContents.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2 text-white">
                {searchTerm ? 'Nenhum resultado encontrado' : 'Em breve!'}
              </h2>
              <p className="text-gray-400">
                {searchTerm 
                  ? 'Tente outros termos de busca.'
                  : 'Estamos preparando conteúdo incrível para você.'
                }
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredContents.map((content) => (
                <Card key={content.id} className="group hover:shadow-lg transition-all duration-300 hover:shadow-cyan-400/20 bg-slate-800 border-slate-700">
                  <div className="relative">
                    {content.cover_image_url ? (
                      <img 
                        src={content.cover_image_url} 
                        alt={content.title}
                        className="aspect-video object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-t-lg flex items-center justify-center">
                        {content.type === 'video' ? (
                          <Play className="h-12 w-12 text-cyan-400" />
                        ) : (
                          <div className="text-cyan-400 font-bold text-lg">POST</div>
                        )}
                      </div>
                    )}
                    <Badge 
                      variant={content.type === 'video' ? 'default' : 'secondary'}
                      className={`absolute top-2 right-2 ${
                        content.type === 'video' 
                          ? 'bg-red-600 hover:bg-red-700' 
                          : 'bg-purple-600 hover:bg-purple-700'
                      }`}
                    >
                      {content.type === 'video' ? 'Vídeo' : 'Post'}
                    </Badge>
                    
                    {/* Category Badge */}
                    {content.category_name && (
                      <Badge 
                        variant="outline"
                        className="absolute top-2 left-2 bg-slate-800/80 text-cyan-400 border-cyan-400"
                      >
                        {content.category_name}
                      </Badge>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-2 group-hover:text-cyan-400 transition-colors text-white">
                      {content.title}
                    </CardTitle>
                    {content.description && (
                      <CardDescription className="line-clamp-2 text-gray-300">
                        {content.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {formatViews(content.views_count)}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {content.likes_count}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {content.comments_count}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Admin</span>
                      <span>{new Date(content.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                    
                    <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-700">
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
      </section>
    </div>
  );
};

export default News;