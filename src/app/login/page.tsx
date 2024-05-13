"use client";

import Navbar from "@/components/Home/navbar";
import "@/styles/custom-bg.css";
import { LoginForm } from "@/components/Login/form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    redirect("/my-boards");
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Background */}
        <div className="home-bg-light block dark:hidden"></div>
        <div className="home-bg-dark hidden dark:block"></div>

        <LoginForm />
      </main>
    </>
  );
}
