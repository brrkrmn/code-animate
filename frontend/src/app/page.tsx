"use client"

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Home = () => {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return (
      <div>
        <p>You are not logged in</p>
        <Link href="auth">Login</Link>
      </div>
    );
  }
  if (status === "authenticated") {
    return (
      <>
        <p>You are logged in</p>
        <Link href="dashboard">Dashboard</Link>
        <button onClick={() => signOut()}>Log out</button>
      </>
    )
  }
}

export default Home;