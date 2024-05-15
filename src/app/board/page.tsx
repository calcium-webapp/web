"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Board/navbar";

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
    </div>
  );
}
