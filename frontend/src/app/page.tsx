"use client"

import Features from "@/components/Landing/Features/Features";
import GetStarted from "@/components/Landing/GetStarted/GetStarted";
import Hero from "@/components/Landing/Hero/Hero";

const Home = () => {
  return (
    <div className="min-h-screen w-full h-full flex flex-col items-center justify-start">
      <Hero />
      <Features />
      <GetStarted />
    </div>
  );
};

export default Home;