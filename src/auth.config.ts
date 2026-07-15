import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublicPage = ["/login", "/register"].includes(nextUrl.pathname);

      if (isPublicPage) return true;
      if (isLoggedIn) return true;
      return false;
    },
  },
};
