import { Search } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "@/components/ownui/theme-toggle";
import { Badge } from "@/components/ui/badge";
import Logo from "../../../public/logo.png";
import LogoDark from "../../../public/logo-dark.png";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { LoggedAvatar } from "@/components/ownui/avatar";

interface NavbarProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  return (
    <nav className="h-14 w-full px-8 border-b border-gray-200 dark:border-white dark:border-opacity-10">
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
        <div className="flex items-center py-4">
          <Search className="relative left-8 top-3 transform -translate-y-1/2 text-gray-500" />
          <Input placeholder={"Search..."} className="pl-10 w-[500px]" onChange={onSearch} />
        </div>
        <div className="flex items-center gap-2">
          <LoggedAvatar img_src="" initials="As" />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
