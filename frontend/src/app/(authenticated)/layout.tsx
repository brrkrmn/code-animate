import Navbar from "@/components/Navbar/Navbar";
import Page from "@/components/Page/Page";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Page withFooter>
      <div className="px-2 tablet:px-4 laptop:px-40 w-full max-w-[1600px]">
        <Navbar />
        {children}
      </div>
    </Page>
  );
};

export default AuthenticatedLayout;
