import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as Y from "yjs";
import { useEffect } from "react";

interface DownloadButtonProps {
  file: Y.Doc;
}

function saveDoc(file: Y.Doc) {
  if (!file) {
    return;
  }

  // Code editor contents
  const text = file.getText("codemirror").toString();

  // Blob
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  // Create downloadable
  const a = document.createElement("a");
  a.href = url;
  a.download = "main.js";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

export function DownloadButton({ file }: DownloadButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
              saveDoc(file);
            }}
          >
            <Download className="w-5 h-5" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Download</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
