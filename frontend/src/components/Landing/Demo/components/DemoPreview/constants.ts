export const demoScene = {
  title: "untitled",
  theme: "tomorrowNightBlue",
  radius: "10",
  public: false,
  language: "javascript",
  background: "#05060f",
  id: "90a85421-df29-4eb1-8dfb-844299af0e4b",
  steps: [
    {
      id: "9d8b4b0d-e3a5-47dc-9fd6-1e20f49cc237",
      content:
        '//This is an example preview\nconst { scrollYProgress } = useScroll({\n  target: sectionRef,\n  offset: ["start end", "end start"],\n});\n\nconst background = useTransform(\n  scrollYProgress,\n  [0, 0.5, 1],\n  [\n    "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 0%)",\n    "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 60%)",\n    "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 0%)",\n  ]\n);',
    },
    {
      id: "cdd6babd-ec2d-4c47-9742-8804b9cac248",
      content:
        '//This is an example preview\nconst { scrollYProgress } = useScroll({\n  target: sectionRef,\n  offset: ["start end", "end start"],\n});\n\nconst background = useTransform( //this line animates the background color as you scroll\n  scrollYProgress,\n  [0, 0.5, 1],\n  [\n    "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 0%)",\n    "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 60%)",\n    "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 0%)",\n  ]\n);',
    },
    {
      id: "d771102d-023e-4286-bb40-9575fe2c86df",
      content:
        '//This is an example preview\nconst { scrollYProgress } = useScroll({\n  target: sectionRef,\n  offset: ["start end", "end start"],\n});\n\nconst background = useTransform( //this line animates the background color as you scroll\n  scrollYProgress,\n  [0, 0.5, 1],\n  [\n    "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 0%)",\n    "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 60%)",\n    "radial-gradient(circle, rgba(24,67,96,1) 0%, rgba(5,6,15,1) 0%)",\n  ]\n); //now backgroud can be used inline in the motion.div',
    },
  ],
};
