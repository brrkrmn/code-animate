import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

export default {   providers: [
    Google, GitHub, Resend
  ],} satisfies NextAuthConfig