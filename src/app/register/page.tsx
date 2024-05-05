import Navbar from "@/components/Home/navbar";
import "@/styles/custom-bg.css";
import { RegisterForm } from "@/components/Register/form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Calcium",
  description: "Create an account",
};

export default function Register() {
  return (
    <>
      <Navbar />
      <main>
        {/* Background */}
        <div className="home-bg-light block dark:hidden"></div>
        <div className="home-bg-dark hidden dark:block"></div>

        <RegisterForm />
      </main>
    </>
  );
}
