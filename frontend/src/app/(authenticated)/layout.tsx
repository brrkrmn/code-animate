import Navbar from "@/components/Navbar/Navbar";
import SceneProvider from "@/context/scene/sceneProvider";
import ScenesProvider from "@/context/scenes/scenesProvider";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ScenesProvider>
        <SceneProvider>
          <Navbar />
          {children}
        </SceneProvider>
      </ScenesProvider>
    </>
  );
};

export default AuthenticatedLayout;
