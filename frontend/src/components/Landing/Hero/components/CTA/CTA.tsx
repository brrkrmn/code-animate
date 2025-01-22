import { Scene } from "@/services/scene/scene.types";
import { createDefaultScene } from "@/utils/createDefaultScene";
import getScenesFromLs from "@/utils/localStorage/getScenesFromLs/getScenesFromLs";
import saveScenesToLs from "@/utils/localStorage/saveScenesToLs/saveScenesToLs";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Spinner from "./components/Spinner/Spinner";

const CTA = ({ wrapped = false }: { wrapped: boolean }) => {
  const [isTryoutLoading, setIsTryoutLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const router = useRouter();

  const onTryOut = () => {
    setIsTryoutLoading(true);
    const defaultScene: Partial<Scene> = createDefaultScene();
    const scenes = getScenesFromLs();

    let newScenes;
    if (!scenes) {
      newScenes = [defaultScene];
    } else {
      newScenes = [...scenes, defaultScene];
    }
    saveScenesToLs(newScenes);
    router.push(`/tryout/${defaultScene.id}`);
  };

  const onGoogleLogin = () => {
    setIsGoogleLoading(true);
    signIn("google");
  };

  const onGithubLogin = () => {
    setIsGithubLoading(true);
    signIn("github");
  };

  return (
    <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: "10%", opacity: 1 }}
      transition={{
        delay: 1,
        duration: 2,
        ease: "easeInOut",
      }}
      className={`flex ${
        wrapped ? "flex-col gap-10" : "flex-row gap-4"
      } items-center justify-center z-40`}
    >
      <motion.button
        onClick={onTryOut}
        className={`${
          wrapped ? "h-14 text-xl w-full" : "h-10 w-40"
        } rounded-full flex items-center justify-center gap-1 gradientText shadow-medium bg-content2 border-small border-divider transition duration-400 hover:shadow-large`}
      >
        {isTryoutLoading ? <Spinner /> : "Try it out!"}
      </motion.button>
      <div
        className={`w-full flex items-center gap-4 ${
          wrapped ? "flex-col border-t-small border-divider pt-10" : "flex-row"
        }`}
      >
        <motion.button
          onClick={onGoogleLogin}
          className={`w-fit ${
            wrapped ? "px-12 text-xl h-14" : "px-6 h-10"
          } flex items-center justify-center gap-2 rounded-full border-small border-divider gradientText shadow-medium transition hover:shadow-large`}
        >
          {isGoogleLoading ? (
            <Spinner />
          ) : (
            <FcGoogle className="text-foreground-100" />
          )}
          <p className="gradientText">Log in with Google</p>
        </motion.button>
        <motion.button
          onClick={onGithubLogin}
          className={`w-fit ${
            wrapped ? "px-12 text-xl h-14" : "px-6 h-10"
          } flex items-center justify-center gap-2 rounded-full border-small border-divider gradientText shadow-medium transition hover:shadow-large`}
        >
          {isGithubLoading ? <Spinner /> : <FaGithub />}
          Log in with Github
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CTA;
