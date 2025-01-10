import Footer from "../Footer/Footer";
import { PageProps } from "./Page.types";

const Page = ({ children, withFooter }: PageProps) => {
  return (
    <main className="w-full h-full min-h-screen min-w-[320px] flex flex-col items-center justify-center">
      {children}
      {withFooter && <Footer />}
    </main>
  );
};

export default Page;
