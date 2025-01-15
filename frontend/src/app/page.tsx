"use client"

import Hero from "@/components/Landing/Hero/Hero";
import SectionMiddle from "@/components/Landing/SectionMiddle";

const Home = () => {
  return (
    <div className="min-h-screen w-full h-full flex flex-col items-center justify-start overflow-hidden">
      <Hero />
      <SectionMiddle />
    </div>
  );
};

export default Home;