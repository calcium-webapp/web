import { useOthers, useSelf } from "@/liveblocks.config";
import Image from "next/image";
import "@/styles/avatar.css";
import { Room } from "./Room";

export function Avatars() {
  return (
    <Room roomId="room-1" fallback="Loading...">
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
        return (
          <Avatar key={connectionId} picture={info.picture} name={info.name} />
        );
      })}

      {currentUser && (
        <div className="relative ml-8 first:ml-0">
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
