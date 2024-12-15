"use client"

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else if (status === "authenticated" && pathname === "/auth") {
      router.push("/");
    } else if (status === "unauthenticated" && pathname === "/dashboard") {
      router.push("/auth");
    } else {
      setIsLoading(false);
    }
  }, [status, pathname, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return <>{children}</>;
  }
};

export default AuthLayout;