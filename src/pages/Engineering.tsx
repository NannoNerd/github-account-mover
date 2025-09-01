import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Wrench, Building2, Globe, Droplets, Truck, Calculator } from 'lucide-react';
import EngineeringAIModal from '@/components/EngineeringAIModal';
import heroImage from '@/assets/hero-engineering-bg.jpg';

const engineeringCategories = [
  {
    icon: Wrench,
    title: 'AutoCAD Civil 3D',
    description: 'Comandos automatizados para modelagem de terrenos, redes e infraestrutura',
    color: 'text-orange-400'
  },
  {
    icon: Building2,
    title: 'Análise Estrutural',
    description: 'Scripts para cálculos de vigas, pilares e fundações',
    color: 'text-blue-400'
  },
  {
    icon: Globe,
    title: 'Geotecnia',
    description: 'Comandos para análise de solo e estabilidade de taludes',
    color: 'text-green-400'
  },
  {
    icon: Droplets,
    title: 'Hidráulica',
    description: 'Cálculos automáticos de redes de água e esgoto',
    color: 'text-cyan-400'
  },
  {
    icon: Truck,
    title: 'Pavimentação',
    description: 'Dimensionamento automático de pavimentos flexíveis e rígidos',
    color: 'text-gray-400'
  },
  {
    icon: Calculator,
    title: 'Orçamentação',
    description: 'Geração automática de planilhas e composições de custos',
    color: 'text-yellow-400'
  }
];

export default function Engineering() {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Full Width */}
      <section className="relative py-20 text-center bg-gradient-to-br from-background via-background/95 to-primary/5 w-screen -mx-[50vw] left-1/2 px-4">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center w-full h-full"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Engenharia Civil & Tecnologia
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transforme sua carreira em engenharia com as ferramentas mais avançadas de IA, 
            tutoriais práticos e projetos reais.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => setIsAIModalOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              Geração de Comandos IA
            </Button>
            <Button variant="outline" size="lg">
              Vídeos Tutoriais IA
            </Button>
            <Button variant="outline" size="lg">
              Playlists de Vídeos
            </Button>
            <Button variant="outline" size="lg">
              Projetos de Engenharia Civil
            </Button>
          </div>
        </div>
      </section>

      {/* AI Command Generation Section - 70% Width on Desktop */}
      <section className="py-16 px-4">
        <div className="w-full max-w-none mx-auto lg:max-w-[70%]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Geração de Comandos por IA
            </h2>
            <p className="text-lg text-muted-foreground">
              Acelere seus projetos com comandos automatizados gerados por inteligência artificial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {engineeringCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-background/80 rounded-full w-fit">
                      <IconComponent className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <CardTitle className="text-xl text-foreground">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* AI Command Generator */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/80 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-foreground">
                  Gerador de Comandos IA
                </CardTitle>
                <CardDescription className="text-center text-muted-foreground">
                  Descreva o que você precisa e nossa IA gerará comandos específicos para engenharia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">AutoCAD</Badge>
                    <Badge variant="secondary" className="text-xs">Civil 3D</Badge>
                    <Badge variant="secondary" className="text-xs">Revit</Badge>
                    <Badge variant="secondary" className="text-xs">SAP2000</Badge>
                    <Badge variant="secondary" className="text-xs">Python</Badge>
                    <Badge variant="secondary" className="text-xs">LISP</Badge>
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90" 
                    size="lg"
                    onClick={() => setIsAIModalOpen(true)}
                  >
                    Gerar Comando
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Engineering Video Section - Dark Theme */}
      {/* Latest Engineering Video Section - Dark Theme */}
      <section className="relative py-16 text-center bg-slate-900 w-screen -mx-[50vw] left-1/2 px-4">
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Último Vídeo de Engenharia
          </h2>
          <Card className="bg-slate-800/80 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="aspect-video bg-slate-700/20 rounded-lg flex items-center justify-center mb-4">
                <p className="text-slate-300">Vídeo em breve...</p>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Novos Recursos do AutoCAD Civil 3D 2024
              </h3>
              <p className="text-slate-300">
                Explore as últimas funcionalidades e melhorias do AutoCAD Civil 3D para projetos de engenharia civil.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Engineering Projects Section - Light Theme */}
      <section className="py-16 px-4 bg-background">
        <div className="w-full max-w-none mx-auto lg:max-w-[70%]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Projetos de Engenharia
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore nossos projetos práticos e casos de estudo em engenharia civil
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Sistema de Drenagem Urbana",
                description: "Projeto completo de sistema de drenagem para área urbana com dimensionamento hidráulico.",
                category: "Hidráulica",
                image: "/placeholder.svg"
              },
              {
                title: "Análise de Estabilidade de Taludes",
                description: "Estudo geotécnico para análise de estabilidade em encostas com diferentes métodos.",
                category: "Geotecnia",
                image: "/placeholder.svg"
              },
              {
                title: "Dimensionamento de Pavimento",
                description: "Projeto de pavimentação rodoviária com análise de tráfego e dimensionamento estrutural.",
                category: "Pavimentação",
                image: "/placeholder.svg"
              },
              {
                title: "Estrutura de Concreto Armado",
                description: "Projeto estrutural completo de edifício residencial com cálculos e detalhamentos.",
                category: "Estrutural",
                image: "/placeholder.svg"
              },
              {
                title: "Rede de Distribuição de Água",
                description: "Sistema de abastecimento de água com dimensionamento de tubulações e reservatórios.",
                category: "Hidráulica",
                image: "/placeholder.svg"
              },
              {
                title: "Terraplanagem e Movimento de Terra",
                description: "Projeto de terraplanagem com cálculo de volumes e otimização de corte e aterro.",
                category: "Topografia",
                image: "/placeholder.svg"
              }
            ].map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover-scale bg-card border-border">
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center mb-4">
                    <span className="text-muted-foreground text-sm">Imagem do Projeto</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Projeto
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <EngineeringAIModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
      />
    </div>
  );
}