import { Background } from "@/components";
import { Dimmer, Loader } from "semantic-ui-react";

export default function Loading() {
  return (
    <>
      <Dimmer active>
        <Loader />
      </Dimmer>
      <Background />;
    </>
  );
}
