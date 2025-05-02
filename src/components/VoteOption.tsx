
import React, { useState } from "react";
import { VoteOption as VoteOptionType } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoteOptionProps {
  option: VoteOptionType;
  selected: boolean;
  onSelect: (optionId: string) => void;
}

const VoteOption: React.FC<VoteOptionProps> = ({ option, selected, onSelect }) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:border-primary",
        selected && "border-primary bg-primary/5"
      )} 
      onClick={() => onSelect(option._id)}
    >
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div 
            className={cn(
              "w-5 h-5 rounded-full border mr-3 flex items-center justify-center",
              selected ? "bg-primary border-primary" : "border-gray-300"
            )}
          >
            {selected && <Check className="h-3 w-3 text-white" />}
          </div>
          <div>
            <p className="font-medium">
              {option.name}
              {option.isCustom && (
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                  Custom
                </span>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoteOption;
