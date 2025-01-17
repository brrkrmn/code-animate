import { Theme } from "@/components/Editor/components/Toolbar/components/ThemeSelector";
import PreviewEditor from "@/components/Preview/components/PreviewEditor/PreviewEditor";
import { EditorView } from "@uiw/react-codemirror";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Demo = () => {
  const editorRef = useRef<EditorView | null>(null);
  const demoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: demoRef,
    offset: ["start end", "end start"],
  });

  const background = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 0%)",
      "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 100%)",
      "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 0%)",
    ]
  );

  const stickyOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.3, 1],
    ["0", "1", "1"]
  );

  const editorScale = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    ["0.5", "1", "1"]
  );

  const onCreate = (editorView: EditorView) => {
    editorRef.current = editorView;
  };

  return (
    <motion.div
      ref={demoRef}
      className="relative w-screen h-[400vh] flex items-start justify-center"
    >
      <motion.div
        style={{ opacity: stickyOpacity, background }}
        className="px-80 sticky top-1/2 -translate-y-1/2 w-screen overflow-visible h-screen flex items-center justify-between"
      >
        <motion.div
          style={{ scale: editorScale }}
          className="flex items-center justify-center w-full"
        >
          <PreviewEditor
            theme={"abyss" as Theme}
            radius="20"
            lang="javascript"
            onCreate={onCreate}
            initialValue={`Codymate is a tool to level up your code presentation \n\n\n\n\n`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Demo;
