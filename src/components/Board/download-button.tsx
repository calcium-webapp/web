import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function DownloadButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Download />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Download source code</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
