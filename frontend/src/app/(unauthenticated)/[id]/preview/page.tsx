"use client";

import { useGetScene } from "@/hooks/useScene";
import dispatchTransactions from "@/utils/dispatchTransactions/dispatchTransactions";
import getTransactions from "@/utils/getTransactions/getTransactions";
import { EditorView } from "@uiw/react-codemirror";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import PreviewEditor from "./components/PreviewEditor/PreviewEditor";

const Preview = () => {
  const params = useParams();
  const id = params.id as string;
  const { data: scene } = useGetScene(id);
  const [currentIndex, setCurrentIndex] = useState(0);

  const editorRef = useRef<EditorView | null>(null);
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);

  const onNextStep = useCallback(() => {
    if (!editorRef.current || !scene) return null;

    timeoutIdsRef.current.forEach((id) => clearTimeout(id));

    const currentContent = scene.steps[currentIndex].content;
    const nextContent = scene.steps[currentIndex + 1].content;

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
    <div
      className="w-full h-screen flex flex-col items-center justify-center px-4 tablet:px-40"
      style={{ background: scene.background }}
    >
      <PreviewEditor
        lang={scene.language}
        radius={scene.radius}
        theme={scene.theme}
        onCreate={onCreate}
        initialValue={scene.steps[0].content}
      />
      <div>
        <button onClick={onPrevStep} disabled={currentIndex === 0}>
          Prev
        </button>
        <button
          onClick={onNextStep}
          disabled={currentIndex === scene.steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Preview;
