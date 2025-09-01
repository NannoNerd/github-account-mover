import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Profile() {
  const { user, loading } = useAuth();

  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Meu Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Nome</label>
              <p className="text-muted-foreground">{user?.user_metadata?.display_name || 'Não informado'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}