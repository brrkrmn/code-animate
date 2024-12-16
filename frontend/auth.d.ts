import "next-auth";

declare module "next-auth" {
  interface Session {
    access_token?: accessToken;
  }
}
