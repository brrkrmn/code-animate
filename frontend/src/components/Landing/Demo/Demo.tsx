import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import DemoPreview from "./components/DemoPreview/DemoPreview";

const Demo = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const background = useTransform(
    scrollYProgress,
    [0.4, 0.5, 1],
    [
      "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 0%)",
      "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 80%)",
      "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 0%)",
    ]
  );

  const editorScale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ background, opacity }}
      className="w-screen h-[150vh] flex flex-col items-center justify-center gap-10 px-4"
    >
      <motion.div className="gradientText text-4xl">
        Level up your code presentation
      </motion.div>
      <motion.div
        style={{ scale: editorScale }}
        className="w-full flex items-center justify-center"
      >
        <DemoPreview />
      </motion.div>
    </motion.div>
  );
};

export default Demo;
