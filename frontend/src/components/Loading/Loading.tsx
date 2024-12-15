import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <Spinner size="lg" color="default" />
    </div>
  );
};

export default Loading;
