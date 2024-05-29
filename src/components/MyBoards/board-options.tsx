"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EllipsisVertical, PencilLine, Trash2 } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface RenameDialogContentProps {
  name: string;
}

function RenameDialogContent({ name }: RenameDialogContentProps) {
  const [newName, setNewName] = useState<string>(name);
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleRename() {
    if (newName == "") {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/board/rename", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          newName: newName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.reload();
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
    <>
      <DialogHeader>
        <DialogTitle>
          <PencilLine className="mr-2 h-6 w-6 inline-block" />
          <span>Rename</span>
        </DialogTitle>
        <DialogDescription>
          Rename this board. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <Input
        defaultValue={name}
        onChange={(evt) => {
          setNewName(evt.target.value);
        }}
      ></Input>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Save
          </Button>
        ) : (
          <Button onClick={() => handleRename()}>Save</Button>
        )}
      </DialogFooter>
    </>
  );
}

function DeleteDialogContent() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <Trash2 className="mr-2 h-6 w-6 inline-block" />
          <span>Delete</span>
        </DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your board.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button variant="destructive">Delete</Button>
      </DialogFooter>
    </>
  );
}

interface BoardOptionsProps {
  name: string;
}

export function BoardOptions({ name }: BoardOptionsProps) {
  const [dialogOption, setDialogOption] = useState<string | null>(null);

  const handleClick = (item: string) => {
    setDialogOption(item);
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => handleClick("Rename")}>
              <PencilLine className="mr-2 h-4 w-4" />
              <span className="">Rename</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => handleClick("Delete")}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span className="">Delete</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        {dialogOption === "Rename" && <RenameDialogContent name={name} />}
        {dialogOption === "Delete" && <DeleteDialogContent />}
      </DialogContent>
    </Dialog>
  );
}
