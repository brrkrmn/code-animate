import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";

const SectionTop = () => {
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

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity }}
      className="w-screen h-screen flex flex-col gap-10 items-center pt-[20%] justify-start animate-slide landingBgReverse"
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
          delay: 6,
          duration: 2,
          ease: "easeInOut",
        }}
        className="flex items-center justify-center gap-4"
      >
        <motion.button
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
          animate={float2}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 6,
            ease: "easeInOut",
          }}
          className="w-40 h-10 rounded-full border-small border-divider gradientText shadow-medium transition hover:shadow-large"
        >
          Log In
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SectionTop;
