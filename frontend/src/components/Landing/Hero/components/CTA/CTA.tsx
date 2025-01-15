import { Scene } from "@/services/scene/scene.types";
import { createDefaultScene } from "@/utils/createDefaultScene";
import getScenesFromLs from "@/utils/localStorage/getScenesFromLs/getScenesFromLs";
import saveScenesToLs from "@/utils/localStorage/saveScenesToLs/saveScenesToLs";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const CTA = () => {
  const router = useRouter();

  const onTryOut = () => {
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

  const tryoutFloat = {
    y: [-5, 5, -5],
    x: [-5, 5, -5],
  };

  const googleFloat = {
    y: [5, -5, -5],
    x: [5, -2, -5],
  };

  const githubFloat = {
    y: [-2, 6, -2],
    x: [2, -5, -2],
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
      className="flex items-center justify-center gap-4 z-40"
    >
      <motion.button
        onClick={onTryOut}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 6,
          ease: "easeInOut",
        }}
        animate={tryoutFloat}
        className="w-40 h-10 rounded-full border-small border-divider bg-content2 gradientText shadow-medium transition hover:shadow-large"
      >
        Try it out!
      </motion.button>
      <motion.button
        onClick={() => signIn("google")}
        animate={googleFloat}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 6,
          ease: "easeInOut",
        }}
        className="w-fit px-6 h-10 flex items-center justify-center gap-2 rounded-full border-small border-divider gradientText shadow-medium transition hover:shadow-large"
      >
        <FcGoogle className="text-foreground-100" />
        <p className="gradientText">Log in with Google</p>
      </motion.button>
      <motion.button
        onClick={() => signIn("github")}
        animate={githubFloat}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut",
        }}
        className="w-fit px-6 h-10 rounded-full flex items-center justify-center gap-2 border-small border-divider gradientText shadow-medium transition hover:shadow-large"
      >
        <FaGithub />
        Log in with Github
      </motion.button>
    </motion.div>
  );
};

export default CTA;
