import * as Styled from "./Splash.styles";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const Splash = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
      <Styled.MadworldSplash>
        <Link href="/madworld" onClick={() => setLoading(true)}>
          <Image
            alt="Madworld Splash"
            fill
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="/images/madworld-splash.png"
            style={{ objectFit: "contain" }}
          />
        </Link>
      </Styled.MadworldSplash>
      <Styled.ESRB />
    </>
  );
};

export default Splash;
