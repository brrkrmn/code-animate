"use client"

import { signIn } from "next-auth/react";

const Auth = () => {
  return (
    <div>
      <p>Login Page</p>
      <button onClick={() => signIn("github", { redirectTo: "/" })}>
        Signin with GitHub
      </button>
    </div>
  )
}

export default Auth;