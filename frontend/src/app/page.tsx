"use client"

import Link from "next/link";

const Home = () => {
  return (
    <div>
      <p>LANDING PAGE</p>
      <Link href="auth">Login</Link>
    </div>
  );
};

export default Home;