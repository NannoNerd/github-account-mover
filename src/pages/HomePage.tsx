import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, Eye, Play, Search, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import heroEngineering from '@/assets/hero-engineering-bg.jpg';
import focoDisciplina from '@/assets/foco-disciplina.jpg';
import mentalidadeVencedora from '@/assets/mentalidade-vencedora.jpg';
import supereLimites from '@/assets/supere-limites.jpg';
import criptosImg from '@/assets/criptos.jpg';
import EngineeringAIModal from '@/components/EngineeringAIModal';
import CryptoAIModal from '@/components/CryptoAIModal';
import TestimonialsSection from '@/components/TestimonialsSection';

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

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('todos');
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [filteredContents, setFilteredContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isCryptoAIModalOpen, setIsCryptoAIModalOpen] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);

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

  const generateMotivationalMessage = async () => {
    setIsGeneratingMessage(true);
    setMotivationalMessage('');

    try {
      const { data, error } = await supabase.functions.invoke('motivational-message');

      if (error) {
        console.error('Error calling motivational-message function:', error);
        toast.error('Erro ao gerar mensagem. Tente novamente.');
        return;
      }

      if (data?.message) {
        setMotivationalMessage(data.message);
      } else {
        toast.error('Mensagem vazia recebida');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao conectar com o assistente IA');
    } finally {
      setIsGeneratingMessage(false);
    }
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
            IVO FERNANDES NEWS
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Engenharia • IA • Motivação • Crypto • Música
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

      {/* Motivational Videos Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">
            Vídeos Motivacionais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-slate-700 border-slate-600 hover:border-cyan-400 transition-colors">
              <CardHeader>
                <img 
                  src={supereLimites} 
                  alt="Supere seus limites" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <CardTitle className="text-white">Supere seus limites</CardTitle>
                <CardDescription className="text-gray-300">
                  Quebre barreiras e alcance seu máximo potencial
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-700 border-slate-600 hover:border-cyan-400 transition-colors">
              <CardHeader>
                <img 
                  src={mentalidadeVencedora} 
                  alt="Mentalidade vencedora" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <CardTitle className="text-white">Mentalidade vencedora</CardTitle>
                <CardDescription className="text-gray-300">
                  Desenvolva uma mentalidade de sucesso
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-700 border-slate-600 hover:border-cyan-400 transition-colors">
              <CardHeader>
                <img 
                  src={focoDisciplina} 
                  alt="Foco e disciplina" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <CardTitle className="text-white">Foco e disciplina</CardTitle>
                <CardDescription className="text-gray-300">
                  Mantenha o foco para alcançar seus objetivos
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <Button
              onClick={generateMotivationalMessage}
              disabled={isGeneratingMessage}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
            >
              {isGeneratingMessage ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Gerando...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Gerar Mensagem Positiva
                </>
              )}
            </Button>

            {motivationalMessage && (
              <div className="mt-6 p-6 bg-slate-700/50 border border-slate-600 rounded-lg max-w-2xl mx-auto">
                <p className="text-cyan-300 italic text-lg">
                  {motivationalMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Crypto Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <img 
                src={criptosImg} 
                alt="Criptomoedas" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            <div className="md:col-span-1 text-center">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Mundo das Criptomoedas
              </h2>
              <p className="text-gray-600 mb-6">
                Descubra as últimas tendências e análises do mercado de criptomoedas
              </p>
              <Button 
                asChild 
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
              >
                <Link to="/criptomoedas">
                  Explorar Crypto
                </Link>
              </Button>
            </div>
            
            <div className="md:col-span-1">
              <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white border-0">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">CryptoMoeda + IA</CardTitle>
                  <CardDescription className="text-yellow-100">
                    Assistente inteligente para suas dúvidas sobre criptomoedas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setIsCryptoAIModalOpen(true)}
                    className="w-full bg-white text-yellow-600 hover:bg-gray-100"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Crypto IA / Pergunte
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Engineering Modal */}
      <EngineeringAIModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />

      {/* Crypto AI Modal */}
      <CryptoAIModal
        isOpen={isCryptoAIModalOpen}
        onClose={() => setIsCryptoAIModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;