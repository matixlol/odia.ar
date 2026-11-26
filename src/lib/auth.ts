import { Auth, type AuthConfig } from "@auth/core";
import type { Session } from "@auth/core/types";
import Google, { type GoogleProfile } from "@auth/core/providers/google";

const ODIA_DOMAIN = "odia.ar";

export const authConfig: AuthConfig = {
  basePath: "/api/auth",
  trustHost: true,
  secret: import.meta.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
      authorization: { params: { hd: ODIA_DOMAIN } },
    }),
  ],
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  callbacks: {
    signIn({ account, profile }) {
      if (account?.provider !== "google") return false;
      const googleProfile = profile as GoogleProfile | undefined;
      return Boolean(
        googleProfile?.email_verified && googleProfile.hd === ODIA_DOMAIN,
      );
    },
  },
};

export async function getSession(request: Request): Promise<Session | null> {
  const sessionUrl = new URL("/api/auth/session", request.url);
  const cookie = request.headers.get("cookie");
  const response = await Auth(
    new Request(sessionUrl, { headers: cookie ? { cookie } : undefined }),
    authConfig,
  );

  if (!response.ok) return null;
  const session = (await response.json()) as Session | null;
  return session?.user?.email ? session : null;
}

export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}
