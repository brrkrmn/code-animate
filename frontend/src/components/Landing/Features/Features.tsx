import {
  Theme,
  themeOptions,
} from "@/components/Editor/components/Toolbar/components/ThemeSelector";
import { langs } from "@uiw/codemirror-extensions-langs";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Marquee from "react-fast-marquee";
import ThemeEditor from "./components/ThemeEditor/ThemeEditor";
import { themeEditorValues } from "./components/ThemeEditor/constants";

const Features = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity }}
      className="relative w-full h-screen tablet:h-[120vh] flex flex-col items-center justify-start gap-28"
    >
      <div className="flex flex-col items-center justify-center gap-4 mt-40 z-50">
        <div className="font-tomorrow text-5xl tablet:text-6xl py-2 text-transparent tracking-wide bg-clip-text bg-gradient-to-b from-[#d8ecf8] to-foreground-100 to-80%">
          Customize
        </div>
        <div className="font-tomorrow text-transparent bg-clip-text bg-gradient-to-b from-[#d8ecf8] to-foreground-100 to-50% text-center text-2xl tablet:text-3xl">
          language, theme, and styling options
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-0 w-full">
        <Marquee gradientColor="#05060f">
          {Object.keys(langs).map((lang, index) => (
            <div
              className="border-small border-divider rounded-full bg-content1 shadow-large py-1 px-5 mx-2 my-2 text-lg flex items-center justify-center gradientText transition duration-500 hover:scale-105"
              key={index}
            >
              {lang}
            </div>
          ))}
        </Marquee>
        <Marquee gradientColor="#05060f" speed={40}>
          {themeOptions.map((theme, index) => (
            <ThemeEditor
              key={index}
              value={themeEditorValues[index % themeEditorValues.length]}
              theme={theme as Theme}
            />
          ))}
        </Marquee>
      </div>
    </motion.div>
  );
};

export default Features;
