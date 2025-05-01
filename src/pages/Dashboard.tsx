
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/authContext";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/Container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VoteResults from "@/components/VoteResults";
import { VoteOption as VoteOptionType } from "@/lib/types";

// Mock function to fetch voting data
const fetchVotingData = async () => {
  // This would be replaced with an actual API call
  return {
    options: [
      { id: "1", name: "Option 1", count: 10 },
      { id: "2", name: "Option 2", count: 7 },
      { id: "3", name: "Option 3", count: 14, isCustom: true },
    ] as VoteOptionType[],
  };
};

const Dashboard: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate("/");
    }
  }, [authState.isAuthenticated, navigate]);

  const { data, isLoading } = useQuery({
    queryKey: ["votingData"],
    queryFn: fetchVotingData,
  });

  const totalVotes = data?.options.reduce((sum, option) => sum + option.count, 0) || 0;

  return (
    <Container>
      <div className="flex flex-col space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={() => navigate("/vote")}>Cast Your Vote</Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {authState.user?.username || "User"}</CardTitle>
              <CardDescription>
                {authState.user?.role === "admin" 
                  ? "You have admin privileges" 
                  : "Cast your vote in the current poll"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {authState.user?.role === "admin" 
                  ? "Access the admin panel to manage users and view detailed results." 
                  : "Your vote matters! Click the button above to participate."}
              </p>
              {authState.user?.role === "admin" && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => navigate("/admin")}
                >
                  Go to Admin Panel
                </Button>
              )}
            </CardContent>
          </Card>

          {isLoading ? (
            <Card>
              <CardContent className="p-6">Loading results...</CardContent>
            </Card>
          ) : (
            data && <VoteResults options={data.options} totalVotes={totalVotes} />
          )}
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
