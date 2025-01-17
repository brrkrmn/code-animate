import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const GetStarted = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const background = useTransform(
    scrollYProgress,
    [0, 0.2, 2],
    [
      "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 0%)",
      "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 100%)",
      "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 0%)",
    ]
  );

  const stickyOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.5, 0.8],
    ["0", "1", "0"]
  );

  return (
    <motion.div
      ref={sectionRef}
      style={{ background }}
      className="w-screen h-[300vh] relative"
    >
      <motion.div
        className="w-[700px] h-screen sticky top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: stickyOpacity }}
      >
        s
      </motion.div>
    </motion.div>
  );
};

export default GetStarted;
