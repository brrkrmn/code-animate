"use client"

import SectionMiddle from "@/components/Landing/SectionMiddle";
import SectionTop from "@/components/Landing/SectionTop";

const Home = () => {
  return (
    <div className="min-h-screen overflow-scroll w-full h-full flex flex-col items-center justify-start">
      <SectionTop />
      <SectionMiddle />
    </div>
  );
};

export default Home;