"use client"

import { Button } from "@nextui-org/react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen py-2 h-full flex items-center justify-center">
      <Button radius="full" variant="bordered" size="lg" color="default">
        <Link href="auth">Login</Link>
      </Button>
    </div>
  );
};

export default Home;