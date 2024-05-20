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
          <div className="w-5 h-5 cursor-pointer">
            <Download className="w-5 h-5"/>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Download source code</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
