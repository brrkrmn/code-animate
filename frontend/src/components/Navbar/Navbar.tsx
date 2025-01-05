"use client";

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";

const Navbar = () => {
  return (
    <div className="h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
          C
        </div>
        <div className="text-xl ">Dashboard</div>
      </div>
      <Button
        variant="bordered"
        color="default"
        radius="full"
        size="sm"
        className="gradientBorder gradientBg w-fit h-fit py-2 px-8"
        isIconOnly
        onPress={() => signOut()}
      >
        <TbLogout className="text-lg gradientText" />
      </Button>
    </div>
  );
};
export default Navbar;
