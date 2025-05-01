
import React from "react";
import { VoteOption } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VoteResultsProps {
  options: VoteOption[];
  totalVotes: number;
}

const VoteResults: React.FC<VoteResultsProps> = ({ options, totalVotes }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vote Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {options.map((option) => {
          const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
          
          return (
            <div key={option._id} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {option.name}
                  {option.isCustom && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                      Custom
                    </span>
                  )}
                </span>
                <span className="text-sm text-muted-foreground">
                  {option.votes} votes ({percentage}%)
                </span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}
        
        <div className="pt-2 text-sm text-muted-foreground">
          Total votes: {totalVotes}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoteResults;
