import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Cog, BookOpen, TrendingUp, Lightbulb, Play, Users, Target, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import Feed from '@/components/Feed';
import heroBackground from '@/assets/hero-engineering-bg.jpg';
import autocadImage from '@/assets/autocad-civil-3d.jpg';
import supereLimitesImage from '@/assets/supere-limites.jpg';
import mentalidadeVencedoraImage from '@/assets/mentalidade-vencedora.jpg';
import focoDisciplinaImage from '@/assets/foco-disciplina.jpg';
import criptosImage from '@/assets/criptos.jpg';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  // Se há uma categoria, mostrar o Feed em vez da homepage
  if (category) {
    return (
      <main className="container mx-auto max-w-7xl px-4">
        <Feed />
      </main>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 41, 59, 0.8), rgba(51, 65, 85, 0.8)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
            Conhecimento, Inspiração e Inovação
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto">
            Aprenda Autocad Civil 3D, inspire-se com vídeos motivacionais e fique por dentro do universo das criptomoedas.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg">
            <Link to="/?category=engenharia" className="flex items-center">
              Explorar Agora
            </Link>
          </Button>
        </div>
      </section>

      {/* AutoCAD Civil 3D Section - 3 columns */}
      <section className="py-20 bg-gray-50">{/* Tema claro */}
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            {/* Coluna 1: Texto */}
            <div>
              <h2 className="text-4xl font-bold mb-6 text-blue-600">
                Aulas de Autocad Civil 3D
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Desenvolva suas habilidades em modelagem, projetos de infraestrutura e análise de terrenos com nossas aulas especializadas de Autocad Civil 3D.
              </p>
              <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                <Link to="/?category=engenharia">
                  Saiba Mais
                </Link>
              </Button>
            </div>
            
            {/* Coluna 2: Imagem */}
            <div className="flex justify-center">
              <img 
                src={autocadImage} 
                alt="Autocad Civil 3D" 
                className="rounded-lg shadow-2xl w-full h-auto max-w-sm"
              />
            </div>
            
            {/* Coluna 3: Engenharia e Designer */}
            <div className="text-center">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Cog className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Engenharia e Designer</h3>
              <p className="text-muted-foreground mb-6">
                Gere scripts e comandos para softwares de engenharia usando IA.
              </p>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white mb-4 w-full max-w-xs">
                Geração de Comandos por IA
              </Button>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Manuais e Tutoriais (Em Breve...)</p>
                <p>Projetos de Engenharia Civil (Em Breve...)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Videos Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600">
              Vídeos Motivacionais
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Encontre inspiração para superar desafios e conquistar seus objetivos com conteúdos motivacionais cuidadosamente selecionados.
            </p>
            <Button className="bg-green-500 hover:bg-green-600 text-white mb-12">
              Gerar Mensagem Positiva
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={supereLimitesImage} 
                  alt="Supere seus limites" 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />
                  Supere seus limites
                </CardTitle>
                <CardDescription>
                  Histórias inspiradoras de resiliência e determinação.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={mentalidadeVencedoraImage} 
                  alt="Mentalidade vencedora" 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-green-600" />
                  Mentalidade vencedora
                </CardTitle>
                <CardDescription>
                  Aprenda a cultivar pensamentos positivos diariamente.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={focoDisciplinaImage} 
                  alt="Foco e disciplina" 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                  Foco e disciplina
                </CardTitle>
                <CardDescription>
                  Descubra como manter a consistência para alcançar seus sonhos.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Cryptocurrency Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src={criptosImage} 
                alt="Criptomoedas" 
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-600">
                Mundo das Criptomoedas
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Explore o fascinante universo das moedas digitais, blockchain e tecnologias descentralizadas. Aprenda sobre investimentos e tendências do mercado cripto.
              </p>
              <Button asChild size="lg" className="bg-yellow-600 hover:bg-yellow-700">
                <Link to="/?category=crypto">
                  Explorar Crypto
                  <TrendingUp className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Nossas Categorias
            </h2>
            <p className="text-muted-foreground">
              Conteúdo especializado para diferentes áreas de interesse
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:border-blue-500">
              <CardHeader className="text-center">
                <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cog className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-blue-600">Engenharia</CardTitle>
                <CardDescription>
                  AutoCAD Civil 3D, projetos e ferramentas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full group-hover:bg-blue-50">
                  <Link to="/?category=engenharia">Explorar</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:border-yellow-500">
              <CardHeader className="text-center">
                <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-yellow-600">Criptomoedas</CardTitle>
                <CardDescription>
                  Bitcoin, blockchain e investimentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full group-hover:bg-yellow-50">
                  <Link to="/?category=crypto">Explorar</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:border-pink-500">
              <CardHeader className="text-center">
                <div className="bg-pink-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-pink-600">Música</CardTitle>
                <CardDescription>
                  Instrumentos, teoria musical e mais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full group-hover:bg-pink-50">
                  <Link to="/?category=music">Explorar</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:border-green-500">
              <CardHeader className="text-center">
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-green-600">Motivacional</CardTitle>
                <CardDescription>
                  Inspiração e desenvolvimento pessoal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full group-hover:bg-green-50">
                  <Link to="/?category=motivational">Explorar</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;