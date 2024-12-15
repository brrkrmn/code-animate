"use client"
import { signIn } from "next-auth/react";

const Auth = () => {
  return (
    <div>
      <p>LOGIN PAGE</p>
      <button onClick={() => signIn("github", { redirectTo: "/" })}>
        Signin with GitHub
      </button>
      <button onClick={() => signIn("google", { redirectTo: "/" })}>
        Signin with Google
      </button>
    </div>
  );
}

export default Auth;