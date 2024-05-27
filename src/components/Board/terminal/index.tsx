"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { AttachAddon } from "@xterm/addon-attach";
import "@xterm/xterm/css/xterm.css";

export default function XTerminal() {
  const terminalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!terminalRef.current) {
      return;
    }

    // Terminal and connection
    const term = new Terminal({
      theme: {
        background: "#faf4ed",
        foreground: "#000",
        cursor: "#000"
      }
    });
    const socket = new WebSocket(
      "ws://52.191.114.5:2375/containers/98f04c39d3b8/attach/ws?stream=1&stdout=1&stdin=1&stderr=1"
    );

    // Spinning up terminal
    const attachAddon = new AttachAddon(socket);
    term.open(terminalRef.current);
    term.loadAddon(attachAddon);

    term.writeln("#This is your terminal. Click me and press Enter!\r");
  }, [terminalRef]);

  return <div ref={terminalRef} className="w-full h-full absolute"></div>;
}
