import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

/**

 * Authenticating your Liveblocks application

 * https://liveblocks.io/docs/authentication

 */

const MOCK_INFO = [
  {
    color: "#D583F0",
    picture: "https://liveblocks.io/avatars/avatar-1.png",
  },

  {
    color: "#F08385",
    picture: "https://liveblocks.io/avatars/avatar-2.png",
  },

  {
    color: "#F0D885",
    picture: "https://liveblocks.io/avatars/avatar-3.png",
  },

  {
    color: "#85EED6",
    picture: "https://liveblocks.io/avatars/avatar-4.png",
  },

  {
    color: "#85BBF0",
    picture: "https://liveblocks.io/avatars/avatar-5.png",
  },

  {
    color: "#8594F0",
    picture: "https://liveblocks.io/avatars/avatar-6.png",
  },

  {
    color: "#85DBF0",
    picture: "https://liveblocks.io/avatars/avatar-7.png",
  },

  {
    color: "#87EE85",
    picture: "https://liveblocks.io/avatars/avatar-8.png",
  },
];

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  // Get the current user's unique id from your database
  const nextauth_session = await getServerSession();

  // Mock data in case of missing data
  const mockIndex = Math.floor(Math.random() * 10) % MOCK_INFO.length;

  // Create a session for the current user
  const session = liveblocks.prepareSession(`mock-user`, {
    userInfo: {
      name: nextauth_session?.user.name,
      color: MOCK_INFO[mockIndex].color,
      picture: nextauth_session?.user.image ? nextauth_session.user.image : MOCK_INFO[mockIndex].picture,
    },
  });

  // Use a naming pattern to allow access to rooms with a wildcard

  session.allow(`*`, session.FULL_ACCESS);

  // Authorize the user and return the result

  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
