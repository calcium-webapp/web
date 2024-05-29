import { useOthers, useSelf } from "@/liveblocks.config";
import Image from "next/image";
import "@/styles/avatar.css";
import { Room } from "./Room";
import { Skeleton } from "@/components/ui/skeleton";

interface AvatarsProps {
  roomId: string;
}

export function Avatars({ roomId }: AvatarsProps) {
  if (!roomId) {
    return <AvatarsSkeleton />;
  }

  return (
    <Room roomId={roomId} fallback={<AvatarsSkeleton />}>
      <AvatarsList />
    </Room>
  );
}

export function AvatarsList() {
  const users = useOthers();

  const currentUser = useSelf();

  return (
    <div className="avatars">
      {users.map(({ connectionId, info }) => {
        if (info)
          return (
            <div key={connectionId} className="relative ml-8">
              <Avatar picture={info.picture} name={info.name} />
            </div>
          );
        else {
          return <></>;
        }
      })}

      {currentUser && (
        <div className="relative ml-8">
          <Avatar
            picture={currentUser.info.picture}
            name={currentUser.info.name}
          />
        </div>
      )}
    </div>
  );
}

function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div className="avatar" data-tooltip={name}>
      <Image
        alt=""
        src={picture}
        className="avatar_picture"
        data-tooltip={name}
        width={20}
        height={20}
      />
    </div>
  );
}

function AvatarsSkeleton() {
  return (
    <div className="avatars">
      <Skeleton className="w-10 h-10 rounded-full relative ml-[-0.5rem]" />
      <Skeleton className="w-10 h-10 rounded-full relative ml-[-0.5rem]" />
      <Skeleton className="w-10 h-10 rounded-full relative ml-[-0.5rem]" />
    </div>
  );
}
