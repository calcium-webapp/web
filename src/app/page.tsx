import Navbar from "@/components/navbar-home";
import "../styles/home-bg.css";

export default function Home() {
  return (
    <>
      {/* Background */}
      <div className="home-bg-light block dark:hidden"></div>
      <div className="home-bg-dark hidden dark:block"></div>

      <Navbar />
    </>
  );
}
