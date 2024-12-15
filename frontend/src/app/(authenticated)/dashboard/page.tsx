"use client";

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";

const Dashboard = () => {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <Button
        variant="bordered"
        color="default"
        radius="full"
        size="lg"
        onPress={() => signOut()}
      >
        Log out
      </Button>
    </div>
  );
};

export default Dashboard;
