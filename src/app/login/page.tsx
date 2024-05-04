import Navbar from "@/components/Home/navbar";
import "@/styles/custom-bg.css";
import { LoginForm } from "@/components/Login/form";

export default function Login() {
  return (
    <>
      {/* Background */}
      <div className="home-bg-light block dark:hidden"></div>
      <div className="home-bg-dark hidden dark:block"></div>

      <Navbar />
      <LoginForm/>
    </>
  );
}