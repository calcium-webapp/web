import Navbar from "@/components/MyBoards/navbar";
import { TypographyH3 } from "@/components/ownui/typography";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My boards - Calcium",
  description: "Create or start your boards",
};

export default function Boards() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 px-8">
        <div className="main_content pt-5 mx-auto max-w-screen-xl flex flex-col h-full">
          <TypographyH3>My boards</TypographyH3>
          <div className="boards w-full py-5 flex-1 overflow-y-auto"></div>
        </div>
      </main>
    </div>
  );
}
