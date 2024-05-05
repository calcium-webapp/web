import "@/styles/board.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BoardOptions } from "./board-options";

export function Board() {
  return (
    <div className="board rounded-lg ">
      <AspectRatio ratio={16 / 9} className="">
        <div className="preview h-3/4 w-full rounded-t-lg"></div>
        <div className="info h-1/4 w-full rounded-b-lg border-2 bg-background flex justify-between items-center px-3">
          <div className="board-name overflow-hidden">
            <span className="font-bold text-gray-600 dark:text-gray-100">beautiful-tiger</span>
          </div>
          <BoardOptions />
        </div>
      </AspectRatio>
    </div>
  );
}
