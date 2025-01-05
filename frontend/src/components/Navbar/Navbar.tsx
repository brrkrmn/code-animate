"use client";

import { Button, User } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { CiUser } from "react-icons/ci";
import { TbLogout } from "react-icons/tb";

const Navbar = () => {
  const { data } = useSession();

  return (
    <div className="h-16 flex items-center justify-between">
      <User
        classNames={{
          description: "hidden mobile:flex",
        }}
        avatarProps={{
          classNames: { base: "bg-content2 gradientBorder" },
          showFallback: true,
          fallback: (
            <CiUser className="text-foreground-50 opacity-40 text-xl" />
          ),
          src: (data?.user?.image ?? undefined) as string | undefined,
        }}
        description={data?.user?.email}
        name={data?.user?.name}
      />
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
