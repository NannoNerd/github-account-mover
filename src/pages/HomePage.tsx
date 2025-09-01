import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp } from 'lucide-react';
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

const HomePage = () => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isCryptoAIModalOpen, setIsCryptoAIModalOpen] = useState(false);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);

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
          
          <div className="flex justify-center space-x-4">
            <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
              <Link to="/news">
                <TrendingUp className="mr-2 h-5 w-5" />
                Ver Notícias
              </Link>
            </Button>
          </div>
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