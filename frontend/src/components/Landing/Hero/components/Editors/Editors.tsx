import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Editors = () => {
  const editorsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: editorsRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.5, 0.8, 1], [1, 0.1, 0]);

  const floatTop = {
    y: ["-3%", "3%", "5%"],
    x: ["2%", "-2%", "1%"],
  };

  const floatRight = {
    y: [5, -5, -5],
    x: [5, -2, 5],
  };

  const floatBottom = {
    y: ["40%", "42%", "39%"],
    x: ["-52%", "-49%", "-50%"],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 1,
        duration: 2,
        ease: "easeInOut",
      }}
      ref={editorsRef}
      className="w-full absolute z-0 h-screen top-0 overflow-hidden flex justify-between"
    >
      <motion.div
        animate={floatTop}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 5,
          ease: "easeInOut",
        }}
        className="w-fit h-fit absolute top-8 -left-24 rounded-xl shadow-medium overflow-hidden border-small border-divider"
      >
        <video
          src="/video/hero-left.mp4"
          autoPlay
          muted
          loop
          width={600}
          height="auto"
        />
      </motion.div>
      <motion.div
        style={{ opacity }}
        animate={floatBottom}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 5,
          ease: "easeInOut",
        }}
        className="w-fit h-fit absolute left-1/2 top-1/2 transform rounded-xl shadow-medium overflow-hidden border-small border-divider"
      >
        <video
          src="/video/hero-middle.mp4"
          autoPlay
          muted
          loop
          width={900}
          height="auto"
        />
      </motion.div>
      <motion.div
        animate={floatRight}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 5,
          ease: "easeInOut",
        }}
        className="w-fit h-fit absolute top-28 -right-36 rounded-xl shadow-medium overflow-hidden border-small border-divider"
      >
        <video
          src="/video/hero-right.mp4"
          autoPlay
          muted
          loop
          width={450}
          height="auto"
        />
      </motion.div>
    </motion.div>
  );
};

export default Editors;
