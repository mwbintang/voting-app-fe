
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/authContext";
import Navbar from "@/components/Navbar";
import VoteOption from "@/components/VoteOption";
import { VoteOption as VoteOptionType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Mock vote options
const initialVoteOptions: VoteOptionType[] = [
  { id: "1", name: "Option 1", count: 5 },
  { id: "2", name: "Option 2", count: 8 },
  { id: "3", name: "Option 3", count: 3 },
];

const VotingPage: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for voting
  const [options, setOptions] = useState<VoteOptionType[]>(initialVoteOptions);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [newOptionText, setNewOptionText] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  
  // Redirect if not authenticated or if user is admin
  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate("/");
    } else if (authState.user?.role === "admin") {
      navigate("/admin");
    }
  }, [authState.isAuthenticated, authState.user, navigate]);
  
  const handleSelectOption = (optionId: string) => {
    if (hasVoted) return;
    setSelectedOptionId(optionId);
  };
  
  const handleAddOption = () => {
    if (!newOptionText.trim()) return;
    
    const newOption: VoteOptionType = {
      id: `custom-${Date.now()}`,
      name: newOptionText,
      count: 0,
      isCustom: true
    };
    
    setOptions([...options, newOption]);
    setSelectedOptionId(newOption.id);
    setNewOptionText("");
    
    toast({
      title: "Custom Option Added",
      description: `"${newOptionText}" has been added as a voting option.`
    });
  };
  
  const handleVote = () => {
    if (!selectedOptionId) return;
    
    // Update the vote count (in a real app, this would be an API call)
    setOptions(options.map(option => {
      if (option.id === selectedOptionId) {
        return { ...option, count: option.count + 1 };
      }
      return option;
    }));
    
    setHasVoted(true);
    
    toast({
      title: "Vote Recorded",
      description: "Your vote has been successfully recorded. Thank you for voting!"
    });
  };
  
  const resetVote = () => {
    setSelectedOptionId(null);
    setHasVoted(false);
  };
  
  if (!authState.user || authState.user.role !== "user") {
    return null; // Don't render anything if not a regular user
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Current Poll</h1>
        
        <div className="max-w-lg mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Cast Your Vote</CardTitle>
              <CardDescription>
                Select an option below or add your own
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {options.map((option) => (
                <VoteOption 
                  key={option.id}
                  option={option}
                  selected={selectedOptionId === option.id}
                  onSelect={handleSelectOption}
                />
              ))}
              
              {!hasVoted && (
                <div className="pt-4 border-t">
                  <p className="mb-2 font-medium">Add a custom option:</p>
                  <div className="flex space-x-2">
                    <Input 
                      value={newOptionText}
                      onChange={(e) => setNewOptionText(e.target.value)}
                      placeholder="Enter a new option..."
                      disabled={hasVoted}
                    />
                    <Button onClick={handleAddOption} disabled={!newOptionText.trim() || hasVoted}>
                      Add
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {!hasVoted ? (
                <Button 
                  onClick={handleVote}
                  disabled={!selectedOptionId}
                  className="w-full"
                >
                  Vote Now
                </Button>
              ) : (
                <div className="w-full flex justify-between">
                  <Button variant="outline" onClick={resetVote}>
                    Vote Again
                  </Button>
                  <p className="text-green-600 font-medium flex items-center">
                    Your vote has been recorded
                  </p>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
