import Navbar from "@/components/MyBoards/navbar";
import { TypographyH3 } from "@/components/ownui/typography";
import type { Metadata } from "next";
import { Board } from "@/components/MyBoards/board";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "My boards - Calcium",
  description: "Create or start your boards",
};

export default function Boards() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 px-8 overflow-hidden">
        <div className="main_content pt-5 mx-auto max-w-screen-xl flex flex-col h-full">
          <TypographyH3 className="pb-2 shadow-[#fff_-5px_10px_11px_5px] dark:shadow-[#09090b_-5px_10px_11px_5px] z-10">
            My boards
          </TypographyH3>
          <ScrollArea>
            <div className="boards w-full py-5 pr-3 grid grid-cols-3 gap-2">
              <Board />
              <Board />
              <Board />
              <Board />
              <Board />
              <Board />
              <Board />
              <Board />
              <Board />
              <Board />
              <Board />
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}
