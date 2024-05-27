"use client";

import { useSearchParams } from "next/navigation";
import CodeEditor from "@/components/Board/code-editor";

export default function Page() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId") + "-code-editor";

  return <CodeEditor roomId={roomId!} />;
}
