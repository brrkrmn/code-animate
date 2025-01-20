"use client";

import { Scene } from "@/services/scene/scene.types";
import dispatchTransactions from "@/utils/dispatchTransactions/dispatchTransactions";
import getTransactions from "@/utils/getTransactions/getTransactions";
import { EditorView } from "@uiw/react-codemirror";
import { useCallback, useEffect, useRef, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Controls from "./components/Controls/Controls";
import PreviewEditor from "./components/PreviewEditor/PreviewEditor";

const Preview = ({ scene }: { scene: Scene }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const editorRef = useRef<EditorView | null>(null);
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);
  const [value, setValue] = useState(scene.steps[0].content);
  const fullScreenHandle = useFullScreenHandle();

  const syncEditor = (content: string) => {
    setValue(content);
  };

  const onNextStep = useCallback(() => {
    if (!editorRef.current || !scene) return null;

    timeoutIdsRef.current.forEach((id) => clearTimeout(id));

    const currentContent = scene.steps[currentIndex].content;
    const nextContent = scene.steps[currentIndex + 1].content;

    syncEditor(currentContent);

    const transactions = getTransactions(currentContent, nextContent);
    const timeoutIds = dispatchTransactions(editorRef.current, transactions);
    timeoutIdsRef.current = timeoutIds;
    setCurrentIndex((prev) => prev + 1);
  }, [currentIndex, scene]);

  const onPrevStep = useCallback(() => {
    if (!editorRef.current || !scene) return null;

    timeoutIdsRef.current.forEach((id) => clearTimeout(id));

    const currentContent = scene.steps[currentIndex].content;
    const prevContent = scene.steps[currentIndex - 1].content;

    syncEditor(currentContent);

    const transactions = getTransactions(currentContent, prevContent);
    const timeoutIds = dispatchTransactions(editorRef.current, transactions);
    timeoutIdsRef.current = timeoutIds;
    setCurrentIndex((prev) => prev - 1);
  }, [currentIndex, scene]);

  useEffect(() => {
    const handleNextKeydown = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowRight" &&
        !(currentIndex === scene!.steps.length - 1)
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

  const onCreate = (editorView: EditorView) => {
    editorRef.current = editorView;
  };

  if (!scene) return null;

  return (
    <FullScreen handle={fullScreenHandle}>
      <div
        className="w-full h-screen flex flex-col items-center justify-center px-4 tablet:px-40"
        style={{ background: scene.background }}
      >
        <PreviewEditor
          lang={scene.language}
          radius={scene.radius}
          theme={scene.theme}
          onCreate={onCreate}
          value={value}
          setValue={setValue}
        />
        <Controls
          fullScreenHandle={fullScreenHandle}
          onPrevStep={onPrevStep}
          onNextStep={onNextStep}
          currentIndex={currentIndex}
          maxIndex={scene.steps.length - 1}
        />
      </div>
    </FullScreen>
  );
};

export default Preview;
