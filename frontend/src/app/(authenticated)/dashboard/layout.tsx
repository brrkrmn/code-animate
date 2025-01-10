import Navbar from "@/components/Navbar/Navbar";
import ScenesProvider from "@/context/scenes/scenesProvider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScenesProvider>
      <Navbar />
      {children}
    </ScenesProvider>
  );
};

export default DashboardLayout;
