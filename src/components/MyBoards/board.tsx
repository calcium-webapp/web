"use client";

import "@/styles/board.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BoardOptions } from "./board-options";
import { motion } from "framer-motion";
import { useAnimate } from "framer-motion";
import { useState, useMemo } from "react";
import { set } from "react-hook-form";

interface BoardProps {
  name: string;
}

const backgrounds: string[] = ["a", "b", "c", "d", "e", "f"];

export function Board({ name }: BoardProps) {
  var randomIndex: number = useMemo(
    () => Math.floor(Math.random() * backgrounds.length),
    []
  );
  var randomBg: string = backgrounds[randomIndex];
  const [scale, setScale] = useState<number>(1);
  const [shadow, setShadow] = useState<string>("");

  return (
    <motion.div
      className={`board rounded-lg hover:z-20 ${shadow}`}
      whileHover={{ scale: scale }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <AspectRatio ratio={16 / 9}>
        <motion.div
          className={`preview ${randomBg} h-3/4 w-full rounded-t-lg cursor-pointer`}
          onHoverStart={() => {
            setScale(1.05);
            setShadow("hover:shadow-2xl");
          }}
          onHoverEnd={() => {
            setScale(1);
            setShadow("");
          }}
        ></motion.div>
        <div className="info h-1/4 w-full rounded-b-lg border-2 bg-background flex justify-between items-center px-3">
          <div className="board-name">
            <span className="font-bold text-gray-600 dark:text-gray-100">
              {name}
            </span>
          </div>
          <BoardOptions name={name} />
        </div>
      </AspectRatio>
    </motion.div>
  );
}
