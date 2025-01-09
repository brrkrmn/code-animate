import Navbar from "@/components/Navbar/Navbar";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-2 tablet:px-4 laptop:px-40 max-w-[1600px]">
      <Navbar />
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
