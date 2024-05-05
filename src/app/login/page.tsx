import Navbar from "@/components/Home/navbar";
import "@/styles/custom-bg.css";
import { LoginForm } from "@/components/Login/form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Calcium",
  description: "Login to your account",
};

export default function Login() {
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
