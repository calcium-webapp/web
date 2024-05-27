import React, { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { AttachAddon } from "@xterm/addon-attach";
import { FitAddon } from '@xterm/addon-fit';

export default function ContainerTerminal() {
  const terminalRef = useRef(null);

  useEffect(() => {
    const terminal = new Terminal();
    const fitAddon = new FitAddon();
    const socket = new WebSocket(
        "ws://52.191.114.5:2375/containers/98f04c39d3b8/attach/ws?stream=1&stdout=1&stdin=1&logs=1"
    );
    const attachAddon = new AttachAddon(socket);
    terminal.loadAddon(fitAddon);
    terminal.loadAddon(attachAddon);

    terminal.open(terminalRef.current);

    fitAddon.fit();

    return () => {
      terminal.dispose();
    };
  }, []);

  return <div ref={terminalRef} />;
}
