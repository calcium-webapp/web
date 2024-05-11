"use client";

import Navbar from "@/components/MyBoards/navbar";
import { TypographyH3 } from "@/components/ownui/typography";
import type { Metadata } from "next";
import { Board } from "@/components/MyBoards/board";
import { NewBoard } from "@/components/MyBoards/new-board";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

// (Temporal, for testing)
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ownui/spinner";

function generateBoards(n: number) {
  var boards = [];
  for (var i = 0; i < n; i++) {
    boards.push({
      name: uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        separator: "-",
        length: 2,
      }),
      id: "",
    });
  }

  return boards;
}
// (end temporal)

interface Board {
  name: string;
  id: string;
}

export default function Boards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulated fetch
  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = () => {
    const fetchedBoards = generateBoards(7);
    setBoards(fetchedBoards);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 px-8 overflow-y-hidden">
        <div className="main_content pt-5 mx-auto max-w-screen-xl flex flex-col h-full">
          <TypographyH3 className="pb-2 shadow-[#fff_-5px_10px_11px_5px] dark:shadow-[#09090b_-5px_10px_11px_5px] z-30">
            My boards
          </TypographyH3>
          <ScrollArea>
            <div className="boards w-full py-5 px-5 grid grid-cols-3 gap-2">
              {loading ? (
                <div className="col-span-3 flex justify-center">
                  <Spinner className="w-12 h-12"/>
                </div>
              ) : (
                boards.map((board, index) => (
                  <Board key={index} name={board.name} id={board.id} />
                ))
              )}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
        <NewBoard />
      </main>
    </div>
  );
}
