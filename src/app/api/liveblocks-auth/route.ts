import { Liveblocks } from "@liveblocks/node";

import { NextRequest } from "next/server";

/**

 * Authenticating your Liveblocks application

 * https://liveblocks.io/docs/authentication

 */

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  // Get the current user's unique id from your database

  const userId = 4;

  // Create a session for the current user

  const session = liveblocks.prepareSession(`user-${userId}`, {
    userInfo: {
      name: "Charlie Layne",
      color: "#D583F0",
      picture: "https://liveblocks.io/avatars/avatar-1.png",
    },
  });

  // Use a naming pattern to allow access to rooms with a wildcard

  session.allow(`*`, session.FULL_ACCESS);

  // Authorize the user and return the result

  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
