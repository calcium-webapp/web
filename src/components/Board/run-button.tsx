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
          <Button variant="outline" size="icon">
            <Play />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Execute</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
