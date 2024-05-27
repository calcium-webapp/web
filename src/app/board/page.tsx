"use client";

import { Navbar } from "@/components/Board/navbar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Whiteboard from "@/components/Board/whiteboard";
// import Terminal from "@/components/Board/terminal";

export default function Board() {
  const roomId = "room-1";

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 p-6 overflow-y-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg border"
        >
          <ResizablePanel defaultSize={50} minSize={40} maxSize={60}>
            {/* Whiteboard */}
            {/* <Whiteboard /> */}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50} minSize={40} maxSize={60}>
                {/* Code editor */}
                <iframe
                  src={`/board/code-editor?roomId=${roomId}`}
                  className="w-full h-full"
                ></iframe>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>{/* Terminal */}</ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
