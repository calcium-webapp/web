"use client";

import { useSearchParams } from "next/navigation";
import CodeEditor from "@/components/Board/code-editor";

export default function Page() {
  const searchParams = useSearchParams();
  const roomId = "codeeditor:" + searchParams.get("roomId");

  return <CodeEditor roomId={roomId!} />;
}
