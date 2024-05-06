"use client";

import "@/styles/board.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BoardOptions } from "./board-options";
import { motion } from "framer-motion";
import { useAnimate } from "framer-motion";

interface BoardProps {
  name: string;
}

const backgrounds: string[] = ["a", "b", "c", "d", "e", "f"];

export function Board({ name }: BoardProps) {
  var randomIndex: number = Math.floor(Math.random() * backgrounds.length);
  var randomBg: string = backgrounds[randomIndex];
  const [scope, animate] = useAnimate();

  function runAnimation(scaleValue: number) {
    animate(
      scope.current,
      {
        scale: scaleValue,
      },
      { type: "spring", stiffness: 400, damping: 10 }
    );
  }

  return (
    <div className="board rounded-lg hover:z-20 hover:shadow-2xl" ref={scope}>
      <AspectRatio ratio={16 / 9}>
        <motion.div
          className={`preview ${randomBg} h-3/4 w-full rounded-t-lg cursor-pointer`}
          onHoverStart={() => {
            runAnimation(1.05);
          }}
          onHoverEnd={() => {
            runAnimation(1);
          }}
        ></motion.div>
        <div className="info h-1/4 w-full rounded-b-lg border-2 bg-background flex justify-between items-center px-3">
          <div className="board-name">
            <span className="font-bold text-gray-600 dark:text-gray-100">
              {name}
            </span>
          </div>
          <BoardOptions />
        </div>
      </AspectRatio>
    </div>
  );
}
