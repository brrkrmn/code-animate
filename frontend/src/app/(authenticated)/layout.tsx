import Page from "@/components/Page/Page";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Page withFooter>
      <div className="px-2 tablet:px-4 laptop:px-40 max-w-[1600px]">
        {children}
      </div>
    </Page>
  );
};

export default AuthenticatedLayout;
