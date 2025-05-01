
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
import { fetchCandidates, voteService } from "@/lib/services/user";

const VotingPage: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for voting
  const [options, setOptions] = useState<VoteOptionType[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [newOptionText, setNewOptionText] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if not authenticated or if user is admin
  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate("/");
    } else if (authState.user?.role === "admin") {
      navigate("/admin");
    }
  }, [authState.isAuthenticated, authState.user, navigate]);

  const loadCandidates = async () => {
    try {
      setIsLoading(true)
      const data = await fetchCandidates();
      setOptions(data);

      // Find the picked candidate and set selectedOptionId
      const picked = data.find(option => option.isPick);
      if (picked) {
        setSelectedOptionId(picked._id);
        setHasVoted(true);
      }

      setIsLoading(false)
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  const handleSelectOption = (optionId: string) => {
    if (hasVoted) return;
    setSelectedOptionId(optionId);
  };

  const handleAddOption = async () => {
    if (!newOptionText.trim()) return;

    // Call the vote service
    await voteService(newOptionText);

    // Fetch updated candidates (to update vote counts and isPick state)
    await loadCandidates()
    setHasVoted(true);
    setNewOptionText("");

    toast({
      title: "Custom Option Added",
      description: `"${newOptionText}" has been added as a voting option.`
    });
  };

  const handleVote = async () => {
    if (!selectedOptionId) return;

    try {
      // Find the selected candidate's name by ID
      const selectedCandidate = options.find(option => option._id === selectedOptionId);
      if (!selectedCandidate) {
        throw new Error("Selected candidate not found.");
      }

      // Call the vote service
      await voteService(selectedCandidate.name);

      // Fetch updated candidates (to update vote counts and isPick state)
      await loadCandidates()
      setHasVoted(true);

      toast({
        title: "Vote Recorded",
        description: "Your vote has been successfully recorded. Thank you for voting!",
      });
    } catch (error) {
      console.error("Vote failed:", error);
      toast({
        title: "Error",
        description: "There was a problem recording your vote. Please try again.",
        variant: "destructive",
      });
    }
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
          <Card loading={isLoading}>
            <CardHeader>
              <CardTitle>Cast Your Vote</CardTitle>
              <CardDescription>
                Select an option below or add your own
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {options.map((option) => (
                <VoteOption
                  key={option._id}
                  option={option}
                  selected={selectedOptionId === option._id}
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
                <div className="w-full flex justify-center">
                  {/* <Button variant="outline" onClick={resetVote}>
                    Vote Again
                  </Button> */}
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
