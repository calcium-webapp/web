"use client";

import { Navbar } from "@/components/Board/navbar";
import { ReactDOM } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import CodeEditor from "@/components/Board/code-editor";
// import Whiteboard from "@/components/Board/whiteboard";
// import Terminal from "@/components/Board/terminal";

export default function Board() {
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
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50} minSize={40} maxSize={60}>
                {/* Code editor */}
                <CodeEditor />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                {/* Terminal */}
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
