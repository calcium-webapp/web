import Logo from "../../../public/logo.png";
import LogoDark from "../../../public/logo-dark.png";
import Link from "next/link";
import Image from "next/image";
import { ShareButton } from "./share-button";
import { ModeToggle } from "../ownui/theme-toggle";

function Avatars() {
  
}

export function Navbar() {
  return (
    <nav className="h-14 w-full px-8 border-b border-gray-200 dark:border-white dark:border-opacity-10">
      <div className="mx-auto max-w-screen-3xl flex items-center h-full justify-between">
        <div className="flex items-center gap-2">
          <Link href="/my-boards">
            <div className="block dark:hidden">
              <Image src={Logo} className="h-[40px] w-[40px]" alt="Logo" />
            </div>
            <div className="hidden dark:block">
              <Image src={LogoDark} className="h-[40px] w-[40px]" alt="Logo" />
            </div>
          </Link>
          <span>amazing-spider</span>
        </div>
        <div className="flex items-center gap-2">
          <ShareButton />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
