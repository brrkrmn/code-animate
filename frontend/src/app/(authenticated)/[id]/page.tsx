"use client";

import Steps from "@/components/Steps/Steps";
import { Theme } from "@/components/Toolbar/components/ThemeSelector/ThemeSelector";
import TitleInput from "@/components/Toolbar/components/TitleInput/TitleInput";
import Toolbar from "@/components/Toolbar/Toolbar";
import { useSceneContext } from "@/context/scene";
import { Button } from "@nextui-org/react";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";
import Link from "next/link";
import { useCallback } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

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
    <div className="w-full h-full min-h-screen flex flex-col gap-6 py-6 pb-40">
      <TitleInput />
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
        <div className="flex items-center justify-end gap-4 absolute right-2 bottom-2">
          {isDirty && (
            <Button
              variant="bordered"
              className="border-small border-[#053118] text-[#095028]"
              onPress={saveChanges}
            >
              Save Changes
            </Button>
          )}
          <Link
            href={`/${changedScene?.id}/preview`}
            target="_blank"
            className="border-small border-divider text-foreground-100"
          >
            PREVIEW
          </Link>
          <Button
            isIconOnly
            variant="bordered"
            className="border-small border-[#610726] text-[#610726]"
            onPress={deleteScene}
          >
            <FaRegTrashAlt />
          </Button>
        </div>
      </div>
      <Steps />
    </div>
  );
};

export default Scene;
