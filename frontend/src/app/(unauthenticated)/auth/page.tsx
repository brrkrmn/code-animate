"use client"
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoLogoReact } from "react-icons/io5";

const Auth = () => {
  const googleSignIn = () => {
    signIn("google");
  };

  const githubSignIn = () => {
    signIn("github");
  };

  return (
    <div className="px-2 h-full min-h-screen flex flex-col items-center justify-start gap-16 pt-[16%]">
      <IoLogoReact className="text-6xl text-default" />
      <div className="flex flex-col items-center justify-center gap-6 w-full">
        <Button
          className="w-full max-w-80 h-14 flex justify-center items-center text-lg mobile:text-xl text-default"
          radius="full"
          color="default"
          variant="bordered"
          onPress={githubSignIn}
          startContent={<FaGithub className="text-3xl shrink-0" />}
        >
          Login with GitHub
        </Button>
        <Button
          className="w-full max-w-80 h-14 flex justify-center items-center text-lg mobile:text-xl text-default"
          radius="full"
          color="default"
          variant="bordered"
          onPress={googleSignIn}
          startContent={<FcGoogle className="text-3xl shrink-0" />}
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Auth;