import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProfileSidebar } from '@/components/ProfileSidebar';
import ContentManager from '@/components/ContentManager';

export default function Profile() {
  const { user, loading } = useAuth();

  // Redirect if not authenticated
  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background overflow-hidden">
        {/* Sidebar - oculta em mobile */}
        <div className="hidden lg:block">
          <ProfileSidebar />
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header com trigger do sidebar */}
          <header className="h-14 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 flex-shrink-0">
            <div className="lg:hidden">
              <SidebarTrigger />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-foreground truncate">Painel Administrativo</h2>
            </div>
          </header>
          
          {/* Content area */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            <ContentManager />
          </main>
        </div>

        {/* Mobile sidebar overlay */}
        <div className="lg:hidden">
          <ProfileSidebar />
        </div>
      </div>
    </SidebarProvider>
  );
}