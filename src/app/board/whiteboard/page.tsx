"use client";

import { useSearchParams } from "next/navigation";
import Whiteboard from "@/components/Board/whiteboard";

export default function Page() {
  const searchParams = useSearchParams();
  const roomId = "whiteboard:" + searchParams.get("roomId");

  return <Whiteboard roomId={roomId!} />;
}
