import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
// For the code editor
import LiveblocksProvider from "@liveblocks/yjs";
// For the whiteboard
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Point, Color, Layer } from "@/components/Board/whiteboard/types";

// Try changing the lostConnectionTimeout value to increase
// or reduct the time it takes to reconnect
const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
});

// Presence represents the properties that exist on every user in the Room
// and that will automatically be kept in sync. Accessible through the
// `user.presence` property. Must be JSON-serializable.
type Presence = {
  // cursor: { x: number; y: number } | null;
  // ...
  selection: string[];
  cursor: Point | null;
  pencilDraft: [x: number, y: number, pressure: number][] | null;
  penColor: Color | null;
};

// Optionally, Storage represents the shared document that persists in the
// Room, even after all users leave. Fields under Storage typically are
// LiveList, LiveMap, LiveObject instances, for which updates are
// automatically persisted and synced to all connected clients.
type Storage = {
  // author: LiveObject<{ firstName: string, lastName: string }>,
  // ...
  layers: LiveMap<string, LiveObject<Layer>>;
  layerIds: LiveList<string>;
};

// Optionally, UserMeta represents static/readonly metadata on each user, as
// provided by your own custom auth back end (if used). Useful for data that
// will not change during a session, like a user's name or avatar.
type UserMeta = {
  id: string; // Accessible through `user.id`
  info: {
    name: string;
    color: string;
    picture: string;
  }; // Accessible through `user.info`
};

export type UserAwareness = {
  user?: UserMeta["info"];
};

export type AwarenessList = [number, UserAwareness][];

// Optionally, the type of custom events broadcast and listened to in this
// room. Use a union for multiple events. Must be JSON-serializable.
type RoomEvent = {
  // type: "NOTIFICATION",
  // ...
};

export type TypedLiveblocksProvider = LiveblocksProvider<
  Presence,
  Storage,
  UserMeta,
  RoomEvent
>;

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);
