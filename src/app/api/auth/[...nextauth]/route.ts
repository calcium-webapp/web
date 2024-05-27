import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const USERS_DB_URL = process.env.USERS_DB_URL;
const LOGIN_ENDPOINT = `${USERS_DB_URL}/login`;
const SIGNUP_SSO_ENDPOINT = `${USERS_DB_URL}/signup/sso`;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Login POST request to backend
          const response = await axios.post(LOGIN_ENDPOINT, {
            username: credentials?.username,
            password: credentials?.password,
          });

          // Return fetched user
          return { id: response.data.id, name: response.data.username };
        } catch (error) {
          console.error("An error occurred trying to login via creds.");
        }

        // If no user was found
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

      // Because backend is down
      return true;

      // Add register of user in database in case of SSO sign-in
      try {
        const response = await axios.post(SIGNUP_SSO_ENDPOINT, {
          id: user.id,
          username: user.name,
          provider: account?.provider,
        });
      } catch (error) {
        console.error("An error occurred trying to register via SSO.");
        console.log("Probable registered twice :)");

        
      }

      return true;
    },
    async jwt({ token, user }) {
      // Return ID as primary key
      if (user?.id) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      // Return ID to client session
      session.user.id = token.id as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
