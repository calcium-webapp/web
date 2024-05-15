import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useRef } from "react";

export function ShareButton() {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
    navigator.clipboard.writeText(currentUrl);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 1000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Send className="mr-2 h-4 w-4" /> Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this board</DialogTitle>
          <DialogDescription>
            Copy the link below and share it with other people to join you.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full items-center space-x-2">
          <Input
            ref={inputRef}
            type="text"
            value={currentUrl}
            className="dark:selection:bg-white dark:selection:text-black selection:bg-black selection:text-white"
          />
          <Button
            onClick={() => {
              handleCopy();
            }}
            disabled={linkCopied ? true : false}
          >
            {linkCopied ? "Copied" : "Copy"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
