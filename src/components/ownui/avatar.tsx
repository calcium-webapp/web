import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export function LoggedAvatar() {
  const { data: session } = useSession();

  if (!session) {
    return <></>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={session?.user?.image as string} alt="" />
          <AvatarFallback>
            {(session?.user?.name as string).substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            signOut();
          }}
        >
          <LogOut className="mr-2 h-4 w-4 text-red-500" />
          <span className="text-red-500 font-semibold">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
