import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <div className="w-full mt-auto border-t-small border-divider py-12 flex flex-col items-center justify-center gap-4 text-md text-foreground-100">
      <p className="text-lg">CodyMate</p>
      <div className="flex items-center gap-1">
        <p>made by</p>
        <Link
          className="hover:text-foreground-50 transition"
          href="https://www.berrakaraman.com/projects"
        >
          Berra Karaman
        </Link>
      </div>
      <div className="flex items-center justify-center gap-6 text-2xl text-foreground-100">
        <Link
          className="hover:text-foreground-50 transition"
          href="https://github.com/brrkrmn"
        >
          <FaGithub />
        </Link>
        <Link
          className="hover:text-foreground-50 transition"
          href="https://www.linkedin.com/in/berra-karaman-3936471b0/"
        >
          <FaLinkedin />
        </Link>
        <Link
          className="hover:text-foreground-50 transition"
          href="mailto:esma.berra.karaman@hotmail.com?subject=CodyMate%20Help%20/%20Feedback"
        >
          <IoMdMail />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
