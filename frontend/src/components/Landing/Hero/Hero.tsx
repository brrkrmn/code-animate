import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CTA from "./components/CTA/CTA";
import Editors from "./components/Editors/Editors";
import Title from "./components/Title/Title";

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity }}
      className="w-screen h-screen flex flex-col gap-10 items-center pt-24 tablet:pt-40 laptop:pt-[10%] justify-start animate-slide landingBgReverse overflow-hidden"
    >
      <Title />
      <CTA />
      <Editors />
    </motion.div>
  );
};

export default Hero;
