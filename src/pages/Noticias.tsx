import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Eye, Calendar, Play } from 'lucide-react';

const newsData = [
  {
    id: 1,
    title: "IA Revoluciona a Engenharia Civil: Novas Ferramentas AutoCAD 2024",
    description: "Descubra como a inteligência artificial está transformando os projetos de engenharia civil com as novas funcionalidades do AutoCAD.",
    category: "Engenharia",
    date: "2024-03-15",
    readTime: "5 min",
    views: 1250,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop&crop=center",
    featured: true
  },
  {
    id: 2,
    title: "Mercado de Criptomoedas: Análise das Tendências para 2024",
    description: "Uma análise completa sobre as principais tendências do mercado cripto e oportunidades de investimento.",
    category: "Crypto",
    date: "2024-03-14",
    readTime: "8 min",
    views: 2100,
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop&crop=center"
  },
  {
    id: 3,
    title: "Superando Limites: Como Desenvolver uma Mentalidade Vencedora",
    description: "Estratégias práticas para desenvolver resiliência e alcançar seus objetivos pessoais e profissionais.",
    category: "Motivacional",
    date: "2024-03-13",
    readTime: "6 min",
    views: 890,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center"
  },
  {
    id: 4,
    title: "Produção Musical com IA: Ferramentas que Estão Mudando a Indústria",
    description: "Explore as ferramentas de inteligência artificial que estão revolucionando a criação musical.",
    category: "Música",
    date: "2024-03-12",
    readTime: "7 min",
    views: 1560,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&crop=center"
  }
];

const videosData = [
  {
    id: 1,
    title: "Tutorial Completo: AutoCAD Civil 3D - Modelagem de Terrenos",
    description: "Aprenda a criar modelos de terreno precisos usando as ferramentas avançadas do Civil 3D.",
    category: "Engenharia",
    duration: "25:30",
    views: 15420,
    date: "2024-03-10",
    thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop&crop=center",
    featured: true
  },
  {
    id: 2,
    title: "Análise Técnica de Bitcoin: Padrões e Estratégias",
    description: "Uma análise profunda dos padrões de preço do Bitcoin e estratégias de trading.",
    category: "Crypto",
    duration: "18:45",
    views: 8960,
    date: "2024-03-08",
    thumbnail: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop&crop=center"
  },
  {
    id: 3,
    title: "Mindset de Sucesso: 7 Hábitos dos Grandes Vencedores",
    description: "Descubra os hábitos fundamentais que separam os vencedores dos demais.",
    category: "Motivacional",
    duration: "22:15",
    views: 12350,
    date: "2024-03-06",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center"
  }
];

export default function Noticias() {
  const [activeTab, setActiveTab] = useState("posts");

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Engenharia': return 'bg-orange-500';
      case 'Crypto': return 'bg-yellow-500';
      case 'Motivacional': return 'bg-green-500';
      case 'Música': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

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
              {newsData.filter(post => post.featured).map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={`${getCategoryColor(post.category)} text-white`}>
                          {post.category}
                        </Badge>
                        <Badge variant="outline">Destaque</Badge>
                      </div>
                      <h2 className="text-2xl font-bold text-foreground mb-3">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {post.views.toLocaleString()}
                        </div>
                      </div>
                      <Button className="w-full md:w-auto">
                        Ler Artigo Completo
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Regular Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsData.filter(post => !post.featured).map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={`${getCategoryColor(post.category)} text-white text-xs`}>
                          {post.category}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.views.toLocaleString()}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Ler Mais
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-8">
              {/* Featured Video */}
              {videosData.filter(video => video.featured).map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="md:flex">
                    <div className="md:w-1/2 relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Button size="lg" className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                          <Play className="h-8 w-8 text-white" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {video.duration}
                      </div>
                    </div>
                    <div className="md:w-1/2 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={`${getCategoryColor(video.category)} text-white`}>
                          {video.category}
                        </Badge>
                        <Badge variant="outline">Destaque</Badge>
                      </div>
                      <h2 className="text-2xl font-bold text-foreground mb-3">
                        {video.title}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {video.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(video.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {video.views.toLocaleString()}
                        </div>
                      </div>
                      <Button className="w-full md:w-auto">
                        <Play className="h-4 w-4 mr-2" />
                        Assistir Vídeo
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Regular Videos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videosData.filter(video => !video.featured).map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-video overflow-hidden relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <Button size="sm" className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                          <Play className="h-5 w-5 text-white" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={`${getCategoryColor(video.category)} text-white text-xs`}>
                          {video.category}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(video.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {video.views.toLocaleString()}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Play className="h-3 w-3 mr-2" />
                        Assistir
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}