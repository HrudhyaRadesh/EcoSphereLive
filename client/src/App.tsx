import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import EcoTrackPage from "@/pages/EcoTrackPage";
import EcoRoutePage from "@/pages/EcoRoutePage";
import GreenDesignerPage from "@/pages/GreenDesignerPage";
import UrbanDashboardPage from "@/pages/UrbanDashboardPage";
import GamificationPage from "@/pages/GamificationPage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ProtectedRoute from "@/components/ProtectedRoute";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard">
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      </Route>
      <Route path="/ecotrack">
        <ProtectedRoute>
          <EcoTrackPage />
        </ProtectedRoute>
      </Route>
      <Route path="/routes">
        <ProtectedRoute>
          <EcoRoutePage />
        </ProtectedRoute>
      </Route>
      <Route path="/designer">
        <ProtectedRoute>
          <GreenDesignerPage />
        </ProtectedRoute>
      </Route>
      <Route path="/urban">
        <ProtectedRoute>
          <UrbanDashboardPage />
        </ProtectedRoute>
      </Route>
      <Route path="/gamification">
        <ProtectedRoute>
          <GamificationPage />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
