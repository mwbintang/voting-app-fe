
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/authContext";
import LoginForm from "@/components/LoginForm";
import { useEffect } from "react";

const Index: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  
  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/");
    }
  }, [authState.isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Vote App</h1>
      <p className="text-muted-foreground mb-8 max-w-md text-center">
        Create polls, cast votes, and view real-time results. Sign in to get started.
      </p>
      <LoginForm />
    </div>
  );
};

export default Index;
