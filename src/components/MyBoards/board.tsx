import "@/styles/board.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function Board() {
  return (
    <div className="board border-2">
      <AspectRatio ratio={16 / 9}></AspectRatio>
    </div>
  );
}
