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
import CodeEditor from "@/components/Board/code-editor";

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
    setRoomId(searchParams.get("roomId")); // "028a27503d7c"
    fetchContainerData();
  }, [roomId]);

  const fetchContainerData = async () => {
    if (!roomId) {
      return;
    }

    try {
      const response = await fetch("/api/board/start", {
        method: "POST",
        body: JSON.stringify({
          containerId: roomId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();

        const formattedData = {
          name: responseData.board.name,
          runtime: responseData.board.data.runtime,
          websocket: responseData.board.data.websocket,
        };

        console.log("\nWEBSOCKET: " + responseData.board.data.websocket + "\n");

        setContainerData(formattedData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setLoading(false);
  };
  /* SIMULATED FETCH */

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        name={containerData?.name as string}
        roomId={roomId!}
        loading={loading}
      />
      <main className="flex-1 p-6 overflow-y-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg border"
        >
          <ResizablePanel defaultSize={50} minSize={40} maxSize={60}>
            {/* Whiteboard */}
            <iframe
              src={`/board/whiteboard?roomId=${roomId}`}
              className="w-full h-full"
            ></iframe>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50} minSize={40} maxSize={60}>
                {/* Code editor */}
                {/* <iframe
                  src={`/board/code-editor?roomId=${roomId}&runtime=${containerData?.runtime}`}
                  className="w-full h-full"
                ></iframe> */}
                <CodeEditor
                  roomId={roomId!}
                  runtime={containerData?.runtime!}
                />
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
