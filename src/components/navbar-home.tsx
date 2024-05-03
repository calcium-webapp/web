import { Button } from "@/components/ui/button";
import { Github, LogIn, Pencil } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "./ownui/theme-toggle";
import { Badge } from "@/components/ui/badge";
import Logo from "../../public/logo.png";
import LogoDark from "../../public/logo-dark.png";

export default function Navbar() {
  return (
    <nav className="h-14 w-full px-8 border-b border-gray-200 dark:border-white dark:border-opacity-10">
      <div className="mx-auto max-w-screen-xl flex items-center h-full justify-between">
        <div className="flex items-center gap-2">
          <div className="block dark:hidden">
            <Image src={Logo} width={40} height={40} alt="Logo" />
          </div>
          <div className="hidden dark:block">
            <Image src={LogoDark} width={40} height={40} alt="Logo" />
          </div>
          <span className="brand font-bold text-lg">Calcium</span>
          <Badge>beta</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Pencil className="mr-2 h-4 w-4" /> Register
          </Button>
          <Button>
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Button>
          <div className="px-3">
            <a href="https://github.com/davnpsh/calcium-frontend">
              <Github />
            </a>
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
