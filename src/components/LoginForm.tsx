
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/authContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This would connect to your backend API
      // For now, we'll simulate a login with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login response
      const user = {
        id: "1",
        username: email.split('@')[0],
        email,
        role: email.includes("admin") ? "admin" : "user"
      };
      
      login(user, "mock-token");
      toast.success(`Welcome back, ${user.username}!`);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{isRegister ? "Register" : "Login"}</CardTitle>
        <CardDescription>
          {isRegister 
            ? "Create an account to start voting" 
            : "Enter your credentials to access the platform"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading 
              ? "Processing..." 
              : isRegister ? "Create account" : "Sign in"}
          </Button>
          <Button 
            type="button" 
            variant="link" 
            className="w-full" 
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister 
              ? "Already have an account? Sign in" 
              : "Don't have an account? Register"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
