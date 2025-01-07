import Navbar from "@/components/Navbar/Navbar";
import SceneProvider from "@/context/scene/sceneProvider";
import ScenesProvider from "@/context/scenes/scenesProvider";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-2 tablet:px-4 laptop:px-40 max-w-[1600px]">
      <ScenesProvider>
        <SceneProvider>
          <Navbar />
          {children}
        </SceneProvider>
      </ScenesProvider>
    </div>
  );
};

export default AuthenticatedLayout;
