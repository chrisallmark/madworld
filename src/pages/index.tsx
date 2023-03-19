import { Background } from "@/components";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/madworld");
  }, [router]);
  return (
    <>
      <Dimmer active>
        <Loader />
      </Dimmer>
      <Background />;
    </>
  );
};

export default Index;
