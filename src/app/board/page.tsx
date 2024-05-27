"use client";

import { Navbar } from "@/components/Board/navbar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Terminal from "@/components/Board/terminal";

export default function Board() {
  const roomId = "room-2";

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
            {/* <iframe
              src={`/board/whiteboard?roomId=${roomId}`}
              className="w-full h-full"
            ></iframe> */}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50} minSize={40} maxSize={60}>
                {/* Code editor */}
                {/* <iframe
                  src={`/board/code-editor?roomId=${roomId}`}
                  className="w-full h-full"
                ></iframe> */}
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                {/* Terminal */}
                <div className="w-full h-full relative">
                  <Terminal />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
