import { Button } from "@/components/ui/button";
import { Github, LogIn, Pencil } from "lucide-react"
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="h-14 w-full px-8 border-b border-white border-opacity-5">
      <div className="mx-auto max-w-screen-xl">
        <div className="">
          <Image src="/logo-inverted.png" width={40} height={40} alt="Logo" />
          <span className="navbar__brand">Calcium</span>
        </div>
        <div className="">
          <Button>
            <Pencil className="mr-2 h-4 w-4" /> Register
          </Button>
          <Button>
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Button>
          <Github />
        </div>
      </div>
    </nav>
  );
}
