import { Scene } from "@/services/scene/scene.types";
import { createDefaultScene } from "@/utils/createDefaultScene";
import getScenesFromLs from "@/utils/localStorage/getScenesFromLs/getScenesFromLs";
import saveScenesToLs from "@/utils/localStorage/saveScenesToLs/saveScenesToLs";
import { motion, useScroll, useTransform } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { TypeAnimation } from "react-type-animation";

const SectionTop = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  const float1 = {
    y: [-5, 5, -5],
    x: [-5, 5, -5],
  };

  const float2 = {
    y: [5, -5, -5],
    x: [5, -2, -5],
  };

  const float3 = {
    y: [-2, 6, -2],
    x: [2, -5, -2],
  };

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

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity }}
      className="w-screen h-screen flex flex-col gap-10 items-center pt-[10%] justify-start animate-slide landingBgReverse"
    >
      <TypeAnimation
        wrapper="span"
        repeat={0}
        cursor={true}
        preRenderFirstString={true}
        speed={30}
        deletionSpeed={10}
        sequence={[
          "Code",
          500,
          "Code Animation",
          500,
          "Code Animat",
          100,
          "Code Animate",
          500,
          "Codeanimate",
          500,
          "Codymate",
        ]}
      />
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: "10%", opacity: 1 }}
        transition={{
          delay: 2,
          duration: 2,
          ease: "easeInOut",
        }}
        className="flex items-center justify-center gap-4"
      >
        <motion.button
          onClick={onTryOut}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 6,
            ease: "easeInOut",
          }}
          animate={float1}
          className="w-40 h-10 rounded-full border-small border-divider bg-content2 gradientText shadow-medium transition hover:shadow-large"
        >
          Try it out!
        </motion.button>
        <motion.button
          onClick={() => signIn("google")}
          animate={float2}
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
          animate={float3}
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
    </motion.div>
  );
};

export default SectionTop;
