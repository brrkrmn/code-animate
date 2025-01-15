"use client";

import { Button, Tooltip, User } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { CiUser } from "react-icons/ci";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";

const Navbar = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-16 flex items-center justify-between transition border-b-small border-divider">
      <div className="flex items-center justify-start gap-4">
        <Tooltip
          content="Go back"
          delay={1000}
          radius="full"
          classNames={{
            base: "bg-content2 text-foreground-100",
          }}
        >
          <Button
            variant="bordered"
            color="default"
            radius="full"
            size="sm"
            className={`gradientBorder gradientBg w-fit h-fit py-2 px-4 ${
              pathname === "/dashboard" ? "hidden" : "visible"
            }`}
            isIconOnly
            onPress={() =>
              router.push(status === "unauthenticated" ? "/" : "/dashboard")
            }
          >
            <IoReturnDownBackOutline className="text-lg gradientText" />
          </Button>
        </Tooltip>
        <User
          className={`${
            pathname === "/dashboard" ? "visible" : "hidden"
          } transition`}
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
      </div>
      <Button
        className={`${
          status === "unauthenticated" ? "hidden" : "visible"
        } gradientBorder gradientBg w-fit h-fit py-2 px-8`}
        variant="bordered"
        color="default"
        radius="full"
        size="sm"
        isIconOnly
        onPress={() => signOut({ redirectTo: "/" })}
      >
        <TbLogout className="text-lg gradientText" />
      </Button>
    </div>
  );
};
export default Navbar;
