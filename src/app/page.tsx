import Navbar from "@/components/Home/navbar";
import Header from "@/components/Home/header";
import { Footer } from "@/components/Home/footer";
import "@/styles/custom-bg.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Background */}
        <div className="home-bg-light block dark:hidden"></div>
        <div className="home-bg-dark hidden dark:block"></div>

        <Header />
      </main>
      <Footer />
    </>
  );
}
