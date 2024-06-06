import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RunButtonProps {
  runtime: string;
  ws: WebSocket;
}

function executeCode(runtime: string, ws: WebSocket) {
  if (!runtime && !ws) {
    console.log(ws);
    return;
  }

  const command = runtime === "node" ? "/usr/local/bin/node /usr/my-workspace/main.js" : "/usr/bin/python3 /usr/my-workspace/main.py";
  ws.send(`\x03\nclear\n${command}\n`);
}

export function RunButton({ runtime, ws }: RunButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-5 h-5 cursor-pointer">
            <Play
              className="w-5 h-5"
              onClick={() => {
                executeCode(runtime, ws);
              }}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Execute</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
