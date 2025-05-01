
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "@/lib/authContext";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import VotingPage from "./pages/VotingPage";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component to handle role-based access
const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  redirectPath 
}: { 
  children: React.ReactNode, 
  requiredRole?: "admin" | "user", 
  redirectPath: string 
}) => {
  const { authState } = useAuth();
  
  if (!authState.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && authState.user?.role !== requiredRole) {
    return <Navigate to={redirectPath} replace />;
  }
  
  return <>{children}</>;
};

// Main routing component that uses authentication context
const AppRoutes = () => {
  const { authState } = useAuth();
  
  // Don't render anything while auth is loading
  if (authState.isLoading) return null;
  
  return (
    <Routes>
      <Route path="/" element={
        authState.isAuthenticated ? 
          (authState.user?.role === "admin" ? 
            <Navigate to="/admin" replace /> : 
            <Navigate to="/vote" replace />
          ) : 
          <Index />
      } />
      
      {/* User routes */}
      <Route path="/vote" element={
        <ProtectedRoute requiredRole="user" redirectPath="/admin">
          <VotingPage />
        </ProtectedRoute>
      } />
      
      {/* Admin routes */}
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin" redirectPath="/vote">
          <AdminPanel />
        </ProtectedRoute>
      } />
      
      {/* Remove dashboard route since we're directly routing to role-specific pages */}
      
      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
