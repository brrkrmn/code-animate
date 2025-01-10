"use client";

import { useGetScene } from "@/hooks/useScene";
import dispatchTransactions from "@/utils/dispatchTransactions/dispatchTransactions";
import getTransactions from "@/utils/getTransactions/getTransactions";
import { EditorView } from "@uiw/react-codemirror";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import PreviewEditor from "./components/PreviewEditor/PreviewEditor";

const Preview = () => {
  const pathname = usePathname();
  const id: string = pathname.split("/")[1];
  const { data: scene } = useGetScene(id);
  const [currentIndex, setCurrentIndex] = useState(0);

  const editorRef = useRef<EditorView | null>(null);
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);

  const onCreate = (editorView: EditorView) => {
    editorRef.current = editorView;
  };

  if (!scene) return null;

  const onNextStep = () => {
    if (!editorRef.current) return null;

    timeoutIdsRef.current.forEach((id) => clearTimeout(id));

    const currentContent = scene.steps[currentIndex].content;
    const nextContent = scene.steps[currentIndex + 1].content;

    const transactions = getTransactions(currentContent, nextContent);
    const timeoutIds = dispatchTransactions(editorRef.current, transactions);
    timeoutIdsRef.current = timeoutIds;
    setCurrentIndex((prev) => prev + 1);
  };

  const onPrevStep = () => {
    if (!editorRef.current) return null;

    timeoutIdsRef.current.forEach((id) => clearTimeout(id));

    const currentContent = scene.steps[currentIndex].content;
    const prevContent = scene.steps[currentIndex - 1].content;

    const transactions = getTransactions(currentContent, prevContent);
    const timeoutIds = dispatchTransactions(editorRef.current, transactions);
    timeoutIdsRef.current = timeoutIds;
    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <div className="w-screen">
      <PreviewEditor
        lang={scene.language}
        radius={scene.radius}
        theme={scene.theme}
        onCreate={onCreate}
        initialValue={scene.steps[0].content}
      />
      <button onClick={onPrevStep} disabled={currentIndex === 0}>
        Prev
      </button>
      <button
        onClick={onNextStep}
        disabled={currentIndex === scene.steps.length - 1}
      >
        Next
      </button>
      <div>{currentIndex}</div>
    </div>
  );
};

export default Preview;
