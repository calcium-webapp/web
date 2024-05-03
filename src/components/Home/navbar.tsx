import { Button } from "@/components/ui/button";
import { Github, LogIn, Pencil } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "@/components/ownui/theme-toggle";
import { Badge } from "@/components/ui/badge";
import Logo from "../../../public/logo.png";
import LogoDark from "../../../public/logo-dark.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-14 w-full px-8 border-b border-gray-200 dark:border-white dark:border-opacity-10 absolute">
      <div className="mx-auto max-w-screen-xl flex items-center h-full justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="block dark:hidden">
              <Image src={Logo} className="h-[40px] w-[40px]" alt="Logo" />
            </div>
            <div className="hidden dark:block">
              <Image src={LogoDark} className="h-[40px] w-[40px]" alt="Logo" />
            </div>
          </Link>
          <Link href="/">
            <span className="brand font-bold text-lg">Calcium</span>
          </Link>
          <Badge>beta</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/register">
            <Button>
              <Pencil className="mr-2 h-4 w-4" /> Register
            </Button>
          </Link>
          <Link href="/login">
            <Button>
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          </Link>
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
