"use client";

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
import { SiJupyter } from "react-icons/si";

export function NewBoard() {
  const boardName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: "-",
    length: 2,
  });

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
          <Input type="text" value={boardName} />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Runtime type</Label>
          <ToggleGroup type="single" className="">
            <ToggleGroupItem
              value="python"
              className="w-20 h-20 flex flex-col gap-1"
            >
              <FaPython className="text-5xl" />
              <span>Python</span>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="nodejs"
              className="w-20 h-20 flex flex-col gap-1"
            >
              <FaNodeJs className="text-5xl" />
              <span>Node</span>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="jupyter"
              className="w-20 h-20 flex flex-col gap-1"
            >
              <SiJupyter className="text-5xl" />
              <span>Jupyter</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
