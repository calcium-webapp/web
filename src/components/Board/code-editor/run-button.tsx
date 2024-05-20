import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function RunButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-5 h-5 cursor-pointer">
            <Play className="w-5 h-5" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Execute</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
