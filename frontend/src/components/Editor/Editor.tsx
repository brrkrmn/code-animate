import Steps from "@/components/Editor/components/Steps/Steps";
import { Theme } from "@/components/Editor/components/Toolbar/components/ThemeSelector/ThemeSelector";
import TitleInput from "@/components/Editor/components/Toolbar/components/TitleInput/TitleInput";
import Toolbar from "@/components/Editor/components/Toolbar/Toolbar";
import { useSceneContext } from "@/context/scene";
import { Button, Tooltip } from "@nextui-org/react";
import { useIsMutating } from "@tanstack/react-query";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { FaRegTrashAlt, FaSave } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";

const Editor = () => {
  const {
    isDirty,
    saveChanges,
    extensions,
    updateScene,
    deleteScene,
    changedScene,
    currentStepNumber,
  } = useSceneContext();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const isDeleting = useIsMutating({ mutationKey: ["deleteScene"] });
  const isSaving = useIsMutating({ mutationKey: ["editScene"] });

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

  const openTooltip = (open: boolean) => {
    if (isDirty) {
      setIsTooltipOpen(open);
    }
  };

  if (!changedScene) return null;

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-6 py-6">
      <div className="flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-4 mb-4">
        <TitleInput />
        <div className="flex items-center justify-end gap-4">
          {isDirty && (
            <Button
              variant="bordered"
              size="md"
              className="border-small rounded-full w-fit px-4 flex items-center justify-center gap-2 h-10 border-divider text-md font-extralight text-foreground text-opacity-80 transition hover:shadow-medium hover:text-opacity-100"
              onPress={saveChanges}
              startContent={
                isSaving === 0 ? (
                  <FaSave className="text-success-200 text-lg" />
                ) : null
              }
              isLoading={isSaving !== 0}
            >
              Save
            </Button>
          )}
          <Tooltip
            isOpen={isTooltipOpen}
            onOpenChange={openTooltip}
            content="Save your changes to see in the preview"
            placement="bottom"
            radius="full"
            classNames={{
              base: "bg-content2 text-foreground-100 rounded-full",
            }}
          >
            <Button
              variant="bordered"
              size="md"
              onPress={() =>
                window.open(`${changedScene.id}/preview`, "_blank")
              }
              target="_blank"
              className="border-small rounded-full w-fit px-4 flex items-center justify-center gap-2 h-10 border-divider text-md font-extralight text-foreground text-opacity-80 transition hover:shadow-medium hover:text-opacity-100"
            >
              <FaPlay className="text-default-300" />
              Preview
            </Button>
          </Tooltip>
          <Button
            variant="bordered"
            size="md"
            startContent={
              isDeleting === 0 ? (
                <FaRegTrashAlt className="text-danger-200 text-lg" />
              ) : null
            }
            isLoading={isDeleting !== 0}
            className="border-small rounded-full w-fit px-4 flex items-center justify-center gap-2 h-10 border-divider text-md font-extralight text-foreground text-opacity-80 transition hover:shadow-medium hover:text-opacity-100"
            onPress={deleteScene}
          >
            Delete
          </Button>
        </div>
      </div>
      <Toolbar />
      <div
        className="relative border-small rounded-xl border-divider py-10 px-2 tablet:py-24 tablet:px-16"
        style={{ background: changedScene.background }}
      >
        <CodeMirror
          minHeight="200px"
          className="w-full h-full"
          value={changedScene.steps[currentStepNumber].content}
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

export default Editor;
