"use client";

import sceneService from "@/services/scene/scene";
// import Loading from "@/components/Loading/Loading";
// import sceneService from "@/services/scene/scene";
import { Button } from "@nextui-org/react";
// import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
// import Link from "next/link";

const Dashboard = () => {
  const getScenes = async () => {
    const data = await sceneService.getUserScenes();
    console.log(data);
  };
  getScenes();
  // const { data, isPending, isError, error } = useQuery({
  //   queryKey: ["userScenes"],
  //   queryFn: sceneService.getUserScenes,
  // });

  // if (isPending) return <Loading />;
  // if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      {/* {data?.map((scene) => (
        <Link href={`/scenes/${scene.id}`} key={scene.id}>
          {scene.title}
        </Link>
      ))} */}
      <Button
        variant="bordered"
        color="default"
        radius="full"
        size="lg"
        onPress={() => signOut()}
      >
        Log out
      </Button>
    </div>
  );
};

export default Dashboard;
