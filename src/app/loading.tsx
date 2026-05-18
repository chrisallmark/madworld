import { Dimmer, Loader } from "semantic-ui-react";

import { Background } from "@/components";

export default function Loading() {
  return (
    <>
      <Dimmer active>
        <Loader />
      </Dimmer>
      <Background />
    </>
  );
}
