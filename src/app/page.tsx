import Navbar from "@/components/Home/navbar";
import Header from "@/components/Home/header";
import "@/styles/home-bg.css";

export default function Home() {
  return (
    <>
      {/* Background */}
      <div className="home-bg-light block dark:hidden"></div>
      <div className="home-bg-dark hidden dark:block"></div>

      <Navbar />
      <Header />
    </>
  );
}
