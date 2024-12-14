"use client"

import { signIn, signOut, useSession } from "next-auth/react";

const Auth = () => {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>
  } else if (status === 'unauthenticated') {
    return (
      <div>
        <p>You are not logged in</p>
        <button onClick={() => signIn("github", { redirectTo: "/" })}>
          Signin with GitHub
        </button>
        <button onClick={() => signIn("google", { redirectTo: "/" })}>
          Signin with Google
        </button>
      </div>
    )
  } else {
    return (
      <>
        <p>You are logged in</p>
        <button onClick={() => signOut()}>Log out</button>
      </>
    )
  }
}

export default Auth;