import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import Auth from "./pages/Auth";
import CreateContent from "./pages/CreateContent";
import PostView from "./pages/PostView";
import VideoView from "./pages/VideoView";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ComingSoonCrypto from "./pages/ComingSoonCrypto";
import ComingSoonMusic from "./pages/ComingSoonMusic";
import ComingSoonMotivational from "./pages/ComingSoonMotivational";
import Engineering from "./pages/Engineering";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route 
                path="/auth" 
                element={
                  <main className="container mx-auto max-w-7xl px-4">
                    <Auth />
                  </main>
                } 
              />
              <Route 
                path="/create" 
                element={
                  <main className="container mx-auto max-w-7xl px-4">
                    <CreateContent />
                  </main>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <main className="container mx-auto max-w-7xl px-4">
                    <Profile />
                  </main>
                } 
              />
              <Route 
                path="/post/:slug" 
                element={
                  <main className="container mx-auto max-w-7xl px-4">
                    <PostView />
                  </main>
                } 
              />
              <Route 
                path="/video/:slug" 
                element={
                  <main className="container mx-auto max-w-7xl px-4">
                    <VideoView />
                  </main>
                } 
              />
              <Route 
                path="/crypto" 
                element={
                  <main className="container mx-auto max-w-7xl px-4">
                    <ComingSoonCrypto />
                  </main>
                } 
              />
              <Route 
                path="/music" 
                element={
                  <main className="container mx-auto max-w-7xl px-4">
                    <ComingSoonMusic />
                  </main>
                } 
              />
              <Route 
                path="/motivational" 
                element={
                  <main className="container mx-auto max-w-7xl px-4">
                    <ComingSoonMotivational />
                  </main>
                } 
              />
              <Route 
                path="/engineering" 
                element={
                  <main className="container mx-auto max-w-7xl px-4">
                    <Engineering />
                  </main>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route 
                path="*" 
                element={
                  <main className="container mx-auto max-w-7xl px-4">
                    <NotFound />
                  </main>
                } 
              />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
