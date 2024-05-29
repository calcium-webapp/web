"use client";

import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FaPython, FaNodeJs } from "react-icons/fa";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export function NewBoard() {
  const suggestedName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: "-",
    length: 2,
  });

  const [name, setName] = useState<string>(suggestedName);
  const [runtime, setRuntime] = useState<string>("node");
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  async function handleCreate(name: string, runtime: string, id: string) {
    if (!name || !id) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/board/create", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          runtime: runtime,
          id: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();

        router.push(`/board?roomId=${responseData.containerId}`);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          className="absolute bottom-5 right-7 z-30 p-2 rounded-full bg-black dark:bg-white cursor-pointer"
          whileHover={{ scale: 1.2, rotate: 90 }}
        >
          <Plus className="h-10 w-10 text-white dark:text-black" />
        </motion.div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new board</DialogTitle>
          <DialogDescription>
            Please select a name and runtime environment
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Name</Label>
          <Input
            type="text"
            defaultValue={name}
            onChange={(evt) => {
              setName(evt.target.value);
            }}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Runtime type</Label>
          <ToggleGroup
            type="single"
            className=""
            value={runtime}
            onValueChange={(runtime) => {
              if (runtime) setRuntime(runtime);
            }}
          >
            <ToggleGroupItem
              value="python"
              className="w-20 h-20 flex flex-col gap-1"
            >
              <FaPython className="text-5xl" />
              <span>Python</span>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="node"
              className="w-20 h-20 flex flex-col gap-1"
            >
              <FaNodeJs className="text-5xl" />
              <span>Node</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          {loading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Create
            </Button>
          ) : (
            <Button
              onClick={() => handleCreate(name, runtime, session?.user.id!)}
            >
              Create
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
