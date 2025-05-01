
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/authContext";
import { Vote, LogOut } from "lucide-react";

const Navbar: React.FC = () => {
  const { authState, logout } = useAuth();
  const isAdmin = authState.user?.role === "admin";
  
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Vote className="h-6 w-6 text-primary mr-2" />
            <Link to="/" className="font-bold text-xl text-foreground">
              VoteApp
            </Link>
          </div>
          
          {authState.isAuthenticated && (
            <div className="flex items-center space-x-4">
              {isAdmin ? (
                <span className="text-sm text-muted-foreground">
                  Admin Dashboard
                </span>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Voting Area
                </span>
              )}
              <div className="border-l pl-4">
                <span className="text-sm text-muted-foreground mr-4">
                  {authState.user?.username} ({authState.user?.role})
                </span>
                <Button 
                  onClick={logout} 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
