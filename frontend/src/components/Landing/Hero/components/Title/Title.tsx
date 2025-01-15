import { TypeAnimation } from "react-type-animation";

const Title = () => {
  return (
    <TypeAnimation
      wrapper="span"
      repeat={0}
      cursor={true}
      preRenderFirstString={true}
      speed={30}
      deletionSpeed={10}
      sequence={[
        "Code",
        500,
        "Code Animation",
        500,
        "Code Animat",
        100,
        "Code Animate",
        500,
        "Codeanimate",
        500,
        "Codymate",
      ]}
    />
  );
};

export default Title;
