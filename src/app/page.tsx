import Navbar from "@/components/Home/navbar";
import Header from "@/components/Home/header";
import "@/styles/home-bg.css";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Background */}
      <div className="home-bg-light block dark:hidden"></div>
      <div className="home-bg-dark hidden dark:block"></div>

      <Navbar />
      <Header />

      <div className="fixed bottom-0 w-[100vw]">
        <p className="text-center mb-2">
          Made with <Heart className="inline-block" /> by{" "}
          <a className="font-bold" href="https://github.com/davnpsh">davnpsh</a>,{" "}
          <a className="font-bold" href="https://github.com/Rcgil30">Rcgil30</a>,{" "}
          <a className="font-bold" href="https://github.com/FiboDev">Fibodev</a> and{" "}
          <a className="font-bold" href="https://github.com/K3nnyZY">K3nnyZY</a>
        </p>
      </div>
    </>
  );
}
