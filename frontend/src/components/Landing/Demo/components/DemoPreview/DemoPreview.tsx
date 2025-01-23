import dispatchTransactions from "@/utils/dispatchTransactions/dispatchTransactions";
import getTransactions from "@/utils/getTransactions/getTransactions";
import { javascript } from "@codemirror/lang-javascript";
import { Tooltip } from "@nextui-org/react";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { demoScene } from "./constants";

const DemoPreview = () => {
  const [value, setValue] = useState(demoScene.steps[0].content);
  const editorRef = useRef<EditorView | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);

  const syncEditor = (content: string) => {
    setValue(content);
  };

  const onNextStep = useCallback(() => {
    if (!editorRef.current) return null;

    timeoutIdsRef.current.forEach((id) => clearTimeout(id));

    const currentContent = demoScene.steps[currentIndex].content;
    const nextContent = demoScene.steps[currentIndex + 1].content;

    syncEditor(currentContent);

    const transactions = getTransactions(currentContent, nextContent);
    const timeoutIds = dispatchTransactions(editorRef.current, transactions);
    timeoutIdsRef.current = timeoutIds;
    setCurrentIndex((prev) => prev + 1);
  }, [currentIndex, demoScene]);

  const onPrevStep = useCallback(() => {
    if (!editorRef.current) return null;

    timeoutIdsRef.current.forEach((id) => clearTimeout(id));

    const currentContent = demoScene.steps[currentIndex].content;
    const prevContent = demoScene.steps[currentIndex - 1].content;

    syncEditor(currentContent);

    const transactions = getTransactions(currentContent, prevContent);
    const timeoutIds = dispatchTransactions(editorRef.current, transactions);
    timeoutIdsRef.current = timeoutIds;
    setCurrentIndex((prev) => prev - 1);
  }, [currentIndex, demoScene]);

  useEffect(() => {
    const handleNextKeydown = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowRight" &&
        !(currentIndex === demoScene!.steps.length - 1)
      ) {
        onNextStep();
      }
    };

    const handlePrevKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && !(currentIndex === 0)) {
        onPrevStep();
      }
    };

    document.addEventListener("keydown", handleNextKeydown);
    document.addEventListener("keydown", handlePrevKeydown);

    return () => {
      document.removeEventListener("keydown", handleNextKeydown);
      document.removeEventListener("keydown", handlePrevKeydown);
    };
  }, [onNextStep, onPrevStep]);

  const themeExt = EditorView.theme({
    "&.cm-editor": {
      outline: "none",
      borderRadius: "10px",
    },
    ".cm-scroller": {
      borderRadius: "10px",
      padding: "20px 20px",
    },
    ".cm-line": {
      borderRadius: "10px",
    },
  });

  return (
    <motion.div className="relative w-full laptop:w-[900px] border-small border-divider rounded-xl bg-content2 shadow-medium">
      <CodeMirror
        value={value}
        onChange={(val) => setValue(val)}
        onCreateEditor={(editorView) => (editorRef.current = editorView)}
        theme={themes.tokyoNightInit({
          settings: {
            background: "#0000000",
            selection: "#ffffff1a",
            selectionMatch: "#ffffff1a",
          },
        })}
        extensions={[javascript({ jsx: true }), themeExt]}
        editable={false}
        height="400px"
        basicSetup={{
          lineNumbers: false,
          highlightActiveLine: false,
          foldGutter: false,
        }}
      />
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-20 border-small border-divider bg-content2 rounded-full h-14 w-40 flex items-center justify-between px-2 shadow-small">
        <Tooltip
          content="Previous step"
          placement="left"
          closeDelay={100}
          delay={1000}
          radius="full"
          classNames={{
            base: "mr-2 bg-content2 text-foreground-100 rounded-full",
          }}
        >
          <button
            onClick={onPrevStep}
            disabled={currentIndex === 0}
            className="enabled:hover:shadow-large shadow-medium disabled:shadow-none group border-small border-divider rounded-full bg-content1 p-2 transition"
          >
            <FaAngleLeft className="text-xl group-disabled:text-foreground-100 group-hover:text-foreground-50" />
          </button>
        </Tooltip>
        <Tooltip
          content="Next step"
          placement="right"
          closeDelay={100}
          delay={1000}
          radius="full"
          classNames={{
            base: "ml-2 bg-content2 text-foreground-100 rounded-full",
          }}
        >
          <button
            onClick={onNextStep}
            disabled={currentIndex === demoScene.steps.length - 1}
            className="
       enabled:hover:shadow-large shadow-medium disabled:shadow-none group border-small border-divider rounded-full bg-content1 p-2 transition"
          >
            <FaAngleRight className="text-xl group-disabled:text-foreground-100 group-hover:text-foreground-50" />
          </button>
        </Tooltip>
      </div>
    </motion.div>
  );
};

export default DemoPreview;
