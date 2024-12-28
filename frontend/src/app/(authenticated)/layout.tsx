import Navbar from "@/components/Navbar/Navbar";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AuthenticatedLayout;
