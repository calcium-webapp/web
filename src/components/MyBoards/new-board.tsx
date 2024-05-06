"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export function NewBoard() {
  return (
    <motion.div
      className="absolute bottom-5 right-7 z-30 p-2 rounded-full bg-black dark:bg-white cursor-pointer"
      whileHover={{ scale: 1.2, rotate: 90 }}
    >
      <Plus className="h-10 w-10 text-white dark:text-black" />
    </motion.div>
  );
}
