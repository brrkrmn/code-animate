"use client"

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated" && pathname === "/auth") router.push("/");
    if (
      status === "unauthenticated" && pathname === "/dashboard") router.push("/auth");
  }, [status, pathname, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return <>{children}</>
}

export default AuthLayout;