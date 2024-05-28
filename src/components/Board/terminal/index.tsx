"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm"; // Just for types
import "@xterm/xterm/css/xterm.css";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface XTerminalProps {
  loading: boolean;
  websocketUrl: string;
}

export default function XTerminal({ loading, websocketUrl }: XTerminalProps) {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();
  const [displayedTerm, setDisplayedTerm] = useState<Terminal | null>(null);

  const lightTheme = {
    background: "#faf4ed",
    foreground: "#000",
    cursor: "#000",
    selectionBackground: "#000",
    selectionForeground: "#fff",
  };

  const darkTheme = {
    background: "#060521",
  };

  useEffect(() => {
    if (loading) {
      return;
    }

    // Import libraries client-side
    const initTerminal = async () => {
      if (!terminalRef.current) {
        return;
      }

      // Clear duplicates
      terminalRef.current.innerHTML = "";

      const { Terminal } = await import("@xterm/xterm");
      const { AttachAddon } = await import("@xterm/addon-attach");
      const { FitAddon } = await import("@xterm/addon-fit");

      // TODO TERMINAL LOGIC:

      // Terminal and connection
      const term = new Terminal({
        theme: resolvedTheme == "light" ? lightTheme : darkTheme,
        cursorBlink: true,
      });

      const socket = new WebSocket(websocketUrl!);

      // Addons
      const attachAddon = new AttachAddon(socket);
      const fitAddon = new FitAddon();

      // Spinning up terminal
      term.loadAddon(attachAddon);
      term.loadAddon(fitAddon);

      term.open(terminalRef.current);

      // Instructions
      term.writeln("# This is your terminal. Click me and press Enter!\r");

      // Initial fit
      fitAddon.fit();

      // Fit on resize
      const resizeObserver = new ResizeObserver(() => {
        try {
          fitAddon && fitAddon.fit();
        } catch (err) {
          console.log(err);
        }
      });

      resizeObserver.observe(terminalRef.current);

      // Set term
      setDisplayedTerm(term);
    };
    initTerminal();
  }, [loading]);

  // Change theme and not lose work
  useEffect(() => {
    if (!displayedTerm) {
      return;
    }

    displayedTerm.options.theme =
      resolvedTheme == "light" ? lightTheme : darkTheme;
  }, [resolvedTheme]);

  return loading ? (
    <XTerminalSkeleton />
  ) : (
    <motion.div
      ref={terminalRef}
      className="w-full h-full p-3 bg-[#faf4ed] dark:bg-[#060521]"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 10,
          stiffness: 200,
          restDelta: 0.001,
        },
      }}
    ></motion.div>
  );
}

function XTerminalSkeleton() {
  return (
    <div className="w-full h-full relative p-3">
      <Skeleton className="w-56 h-4 inline-block mr-1" />
      <Skeleton className="w-20 h-4 inline-block" />
      <Skeleton className="w-full h-full" />
    </div>
  );
}
