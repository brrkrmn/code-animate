"use client";

import Steps from "@/components/Steps/Steps";
import { Theme } from "@/components/Toolbar/components/ThemeSelector/ThemeSelector";
import TitleInput from "@/components/Toolbar/components/TitleInput/TitleInput";
import Toolbar from "@/components/Toolbar/Toolbar";
import { useSceneContext } from "@/context/scene";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";
import Link from "next/link";
import { useCallback } from "react";
import { FaRegTrashAlt, FaSave } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";

const Scene = () => {
  const {
    isDirty,
    saveChanges,
    extensions,
    updateScene,
    deleteScene,
    changedScene,
    currentStepNumber,
  } = useSceneContext();

  const onChange = useCallback(
    (val: string) => {
      updateScene({
        steps: (changedScene?.steps || []).map((step, index) =>
          step && index === currentStepNumber ? { ...step, content: val } : step
        ),
      });
    },
    [changedScene, currentStepNumber]
  );

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-6 py-6">
      <div className="flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-4 mb-4">
        <TitleInput />
        <div className="flex items-center justify-end gap-4">
          {isDirty && (
            <button
              className="border-small rounded-full w-fit px-4 flex items-center justify-center gap-2 h-10 border-divider text-foreground text-opacity-80 transition hover:shadow-medium hover:text-opacity-100"
              onClick={saveChanges}
            >
              <FaSave className="text-success-200" />
              Save
            </button>
          )}
          <Link
            href={`/${changedScene?.id}/preview`}
            target="_blank"
            className="border-small rounded-full w-fit px-4 flex items-center justify-center gap-2 h-10 border-divider text-foreground text-opacity-80 transition hover:shadow-medium hover:text-opacity-100"
          >
            <FaPlay className="text-default-300" />
            Preview
          </Link>
          <button
            className="border-small rounded-full w-fit px-4 flex items-center justify-center gap-2 h-10 border-divider text-foreground text-opacity-80 transition hover:shadow-medium hover:text-opacity-100"
            onClick={deleteScene}
          >
            <FaRegTrashAlt className="text-danger-200" />
            Delete
          </button>
        </div>
      </div>
      <Toolbar />
      <div
        style={{ background: changedScene?.background }}
        className="relative border-small rounded-xl border-divider py-10 px-2 tablet:py-24 tablet:px-16"
      >
        <CodeMirror
          minHeight="200px"
          className="w-full h-full"
          value={changedScene?.steps[currentStepNumber].content}
          onChange={onChange}
          theme={themes[changedScene?.theme as keyof typeof themes] as Theme}
          extensions={extensions}
          autoFocus={true}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
          }}
        />
      </div>
      <Steps />
    </div>
  );
};

export default Scene;
