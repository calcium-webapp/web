import { Heart } from "lucide-react";

export function Footer() {
  return (
    <div className="fixed bottom-0 w-[100vw]">
      <p className="text-center mb-2">
        Made with <Heart className="inline-block" /> by{" "}
        <a className="font-bold" href="https://github.com/davnpsh">
          davnpsh
        </a>
        ,{" "}
        <a className="font-bold" href="https://github.com/Rcgil30">
          Rcgil30
        </a>
        ,{" "}
        <a className="font-bold" href="https://github.com/FiboDev">
          FiboDev
        </a>{" "}
        and{" "}
        <a className="font-bold" href="https://github.com/K3nnyZY">
          K3nnyZY
        </a>
      </p>
    </div>
  );
}
