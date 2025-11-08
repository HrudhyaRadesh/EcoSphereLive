import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowLeft, LogOut, Leaf } from "lucide-react";
import { Link } from "wouter";
import { logout, getCurrentUser } from "@/lib/auth";

interface AuthNavbarProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  showBack?: boolean;
}

export default function AuthNavbar({ title, icon: Icon, showBack = true }: AuthNavbarProps) {
  const user = getCurrentUser();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBack && (
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              {Icon ? <Icon className="h-5 w-5 text-primary-foreground" /> : <Leaf className="h-5 w-5 text-primary-foreground" />}
            </div>
            <span className="font-bold text-xl">{title}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {user && (
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.username}
            </span>
          )}
          <ThemeToggle />
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
