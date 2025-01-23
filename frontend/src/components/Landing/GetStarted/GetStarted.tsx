import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CTA from "../Hero/components/CTA/CTA";

const GetStarted = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

  return (
    <motion.div
      style={{ opacity }}
      ref={sectionRef}
      className="w-screen h-screen flex flex-col items-center justify-start gap-20"
    >
      <motion.div className="mt-10 tablet:mt-32 z-50 text-center text-5xl tablet:text-6xl py-2 text-transparent tracking-wide bg-clip-text bg-gradient-to-b from-[#d8ecf8] to-foreground-100 to-80%">
        Get started today
      </motion.div>
      <CTA wrapped={true} />
    </motion.div>
  );
};

export default GetStarted;
