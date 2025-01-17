import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Features = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity }}
      className="p-20 w-screen h-screen flex flex-col items-center justify-between"
    ></motion.div>
  );
};

export default Features;
