"use client"

import Demo from "@/components/Landing/Demo/Demo";
import Features from "@/components/Landing/Features/Features";
import GetStarted from "@/components/Landing/GetStarted/GetStarted";
import Hero from "@/components/Landing/Hero/Hero";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Home = () => {
  const spotlightSectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: spotlightSectionRef,
    offset: ["start end", "end start"],
  });

  const spotlight1 = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.3, 0.5],
    [
      "linear-gradient(180deg, rgba(0,0,0,1) 80%, #000000 90%, rgba(0,0,0,1) 100%)",
      "linear-gradient(170deg, rgba(0,0,0,1) 60%, rgba(18,50,71,1) 90%, rgba(0,0,0,1) 100%)",
      "linear-gradient(120deg, rgba(0,0,0,1) 40%, rgba(18,50,71,1) 60%, rgba(0,0,0,1) 65%)",
      "linear-gradient(60deg, rgba(0,0,0,1) 40%, rgba(18,50,71,1) 60%, rgba(0,0,0,1) 65%)",
    ]
  );

  const spotlight2 = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.3, 0.5],
    [
      "linear-gradient(180deg, rgba(0,0,0,0) 80%, #000000 90%, rgba(0,0,0,0) 100%)",
      "linear-gradient(190deg, rgba(0,0,0,0) 60%, rgba(18,50,71,1) 90%, rgba(0,0,0,0) 100%)",
      "linear-gradient(240deg, rgba(0,0,0,0) 40%, rgba(18,50,71,1) 60%, rgba(0,0,0,0) 65%)",
      "linear-gradient(300deg, rgba(0,0,0,0) 40%, rgba(18,50,71,1) 60%, rgba(0,0,0,0) 65%)",
    ]
  );

  return (
    <div className="min-h-screen w-full h-full flex flex-col items-center justify-start">
      <Hero />
      <Demo />
      <motion.div
        ref={spotlightSectionRef}
        style={{ background: spotlight1 }}
        className="relative w-full h-[220vh] flex flex-col items-center justify-start gap-28"
      >
        <motion.div
          style={{ background: spotlight2 }}
          className="absolute w-full h-[220vh] top-0 left-0"
        ></motion.div>
        <Features />
        <GetStarted />
      </motion.div>
    </div>
  );
};

export default Home;