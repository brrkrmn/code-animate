import { motion } from "framer-motion";
import { useRef } from "react";

const GetStarted = () => {
  const sectionRef = useRef(null);
  return (
    <motion.div ref={sectionRef} className="w-screen h-screen"></motion.div>
  );
};

export default GetStarted;
