import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

/**

 * Authenticating your Liveblocks application

 * https://liveblocks.io/docs/authentication

 */

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  // Get the current user's unique id from your database
  const nextauth_session = await getServerSession();
  console.log(nextauth_session);

  // Create a session for the current user

  const session = liveblocks.prepareSession(`mock-user`, {
    userInfo: {
      name: nextauth_session?.user.name,
      color: "#D583F0",
      picture: nextauth_session?.user.image,
    },
  });

  // Use a naming pattern to allow access to rooms with a wildcard

  session.allow(`*`, session.FULL_ACCESS);

  // Authorize the user and return the result

  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
