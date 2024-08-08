"use client";

import { Background } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export default function () {
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
}
