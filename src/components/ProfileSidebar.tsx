import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from 'react-router-dom';
import { FileText, Video, Settings, User, BarChart3 } from 'lucide-react';

const sidebarItems = [
  { title: "Meus Conteúdos", url: "/profile", icon: FileText },
  { title: "Rascunhos", url: "/profile/drafts", icon: FileText },
  { title: "Vídeos", url: "/profile/videos", icon: Video },
  { title: "Estatísticas", url: "/profile/stats", icon: BarChart3 },
  { title: "Configurações", url: "/profile/settings", icon: Settings },
];

export function ProfileSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/profile') {
      return currentPath === '/profile' || currentPath === '/profile/';
    }
    return currentPath.startsWith(path);
  };

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent/50";

  return (
    <Sidebar
      className={`${state === "collapsed" ? "w-14" : "w-64"} lg:relative lg:translate-x-0`}
      variant="sidebar"
      side="left"
    >
      <SidebarContent className="bg-background border-r">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
            {state !== "collapsed" && (
              <div>
                <h3 className="font-semibold text-foreground">Painel Admin</h3>
                <p className="text-sm text-muted-foreground">Gerenciar conteúdo</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === '/profile'}
                      className={({ isActive }) => getNavCls({ isActive })}
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}