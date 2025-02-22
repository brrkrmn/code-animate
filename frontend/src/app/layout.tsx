import ToastProvider from "@/context/toast/toastProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider/ReactQueryProvider";
import ThemeProvider from "@/providers/ThemeProvider/ThemeProvider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";
import React from "react";
import AuthLayout from "./authLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codymate",
  description: "Level up your code presentation",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className="dark">
      <head>
        <PlausibleProvider domain="codymate.com" />
      </head>
      <body className="antialiased">
        <ReactQueryProvider>
          <ThemeProvider>
            <ToastProvider>
              <SessionProvider>
                <AuthLayout>{children}</AuthLayout>
              </SessionProvider>
            </ToastProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
