import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import CTA from "../Hero/components/CTA/CTA";

const GetStarted = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const logoZoom = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  return (
    <motion.div
      style={{ opacity }}
      ref={sectionRef}
      className="w-screen h-screen flex flex-col items-center justify-start gap-20"
    >
      <motion.div className="flex items-center justify-center flex-col font-tomorrow mt-10 tablet:mt-32 z-50 text-center px-4 text-5xl tablet:text-6xl py-2">
        <motion.div
          style={{ scale: logoZoom }}
          className="w-fit p-4 flex items-center justify-center "
        >
          <Image
            src="/logo/codymate-logo.svg"
            alt="Codymate logo"
            width="250"
            height="100"
          />
        </motion.div>
        <div className="text-transparent tracking-wide bg-clip-text bg-gradient-to-b from-[#d8ecf8] to-foreground-100 to-80%">
          Get started today
        </div>
      </motion.div>
      <CTA wrapped={true} />
    </motion.div>
  );
};

export default GetStarted;
