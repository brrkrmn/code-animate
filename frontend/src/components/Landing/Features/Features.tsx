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

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity }}
      className="p-20 w-screen border-2 h-screen flex flex-col items-center justify-between"
    >
      <Marquee pauseOnClick gradient gradientColor="#05060f">
        {Object.keys(langs).map((lang, index) => (
          <div
            className="border-small border-divider rounded-full bg-content1 shadow-large py-1 px-5 mx-2 text-xl flex items-center justify-center gradientText transition hover:scale-105"
            key={index}
          >
            {lang}
          </div>
        ))}
      </Marquee>
      <Marquee pauseOnClick gradient gradientColor="#05060f">
        {themeOptions.map((theme, index) => (
          <ThemeEditor
            key={index}
            value={themeEditorValues[index % themeEditorValues.length]}
            theme={theme as Theme}
          />
        ))}
      </Marquee>
    </motion.div>
  );
};

export default Features;
