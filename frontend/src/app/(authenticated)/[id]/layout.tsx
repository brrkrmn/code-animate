import SceneProvider from "@/context/scene/sceneProvider";

const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return <SceneProvider>{children}</SceneProvider>;
};

export default EditorLayout;
