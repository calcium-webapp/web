"use client";

import { Navbar } from "@/components/Board/navbar";
import Terminal from "@/components/Board/terminal";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Delete after :)
function mockStartContainer() {
  return {
    name: "amazing-cat",
    runtime: "python",
    websocket:
      "ws://52.191.114.5:2375/containers/028a27503d7c/attach/ws?stream=1&stdout=1&stdin=1",
  };
}
//

interface Container {
  name: string;
  runtime: string;
  websocket: string;
}

export default function Board() {
  const searchParams = useSearchParams();

  const [containerData, setContainerData] = useState<Container>();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /* SIMULATED FETCH */
  useEffect(() => {
    // roomId = containerId
    setRoomId(searchParams.get("roomId"));  // "028a27503d7c"

    const timer = setTimeout(() => {
      fetchContainerData();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const fetchContainerData = () => {
    // mock fetch
    setContainerData(mockStartContainer());
    setLoading(false);
  };
  /* SIMULATED FETCH */

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
                <iframe
                  src={`/board/code-editor?roomId=${roomId}&runtime=${containerData?.runtime}`}
                  className="w-full h-full"
                ></iframe>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                {/* Terminal */}
                <Terminal
                  websocketUrl={containerData?.websocket as string}
                  loading={loading}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
