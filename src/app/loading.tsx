import { Background } from "@/components";
import { Dimmer, Loader } from "semantic-ui-react";

export default function () {
  return (
    <>
      <Dimmer active>
        <Loader />
      </Dimmer>
      <Background />;
    </>
  );
}
