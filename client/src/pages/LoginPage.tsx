import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ThemeToggle from "@/components/ThemeToggle";
import { Leaf, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      localStorage.setItem('user', JSON.stringify({ email, username: email.split('@')[0] }));
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to EcoSphere AI.",
      });
      window.location.href = '/dashboard';
    } else {
      localStorage.setItem('user', JSON.stringify({ email, username }));
      toast({
        title: "Account created!",
        description: "Welcome to EcoSphere AI. Start your eco journey now!",
      });
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <div className="min-h-[calc(100vh-73px)] grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center p-8">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="font-bold text-2xl">EcoSphere AI</span>
              </div>
              <CardTitle className="text-2xl">
                {isLogin ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <CardDescription>
                {isLogin 
                  ? "Sign in to continue your sustainability journey" 
                  : "Join thousands making a difference for our planet"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-10"
                        data-testid="input-username"
                        required
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      data-testid="input-email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      data-testid="input-password"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  data-testid="button-submit"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    type="button"
                    variant="outline"
                    data-testid="button-google"
                    onClick={() => toast({ title: "Coming soon!", description: "Google login will be available soon." })}
                  >
                    Google
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    data-testid="button-github"
                    onClick={() => toast({ title: "Coming soon!", description: "GitHub login will be available soon." })}
                  >
                    GitHub
                  </Button>
                </div>

                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:underline"
                    data-testid="button-toggle-mode"
                  >
                    {isLogin 
                      ? "Don't have an account? Sign up" 
                      : "Already have an account? Sign in"}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 p-8">
          <div className="max-w-md text-center space-y-6">
            <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center mx-auto">
              <Leaf className="h-12 w-12 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Build a Sustainable Future</h2>
            <p className="text-lg text-muted-foreground">
              Track your carbon footprint, discover eco-friendly routes, and get AI-powered recommendations 
              to live more sustainably every day.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div>
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">2.5M</div>
                <div className="text-sm text-muted-foreground">CO₂ Saved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">120+</div>
                <div className="text-sm text-muted-foreground">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
