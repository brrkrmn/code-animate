"use client"

// import { Button } from "@nextui-org/react";
// import Link from "next/link";
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
  return (
    <div className="min-h-screen py-2 h-full flex items-center justify-center">
      <TypeAnimation
        wrapper="span"
        repeat={0}
        cursor={true}
        preRenderFirstString={true}
        speed={30}
        deletionSpeed={10}
        sequence={[
          "Code",
          1000,
          "Code Animation",
          1000,
          "Code Animat",
          200,
          "Code Animate",
          1000,
          "Codeanimate",
          1000,
          "Codymate",
        ]}
      />
    </div>
  );
};

export default Home;