import { useEffect, useState } from "react";
import * as Styled from "./Background.styles";

const Background = ({ children }: React.PropsWithChildren) => {
  const [background, setBackground] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setBackground(Math.floor(Math.random() * 20));
    }, 30000);
  }, [background, setBackground]);
  return (
    <Styled.Background background={String(background).padStart(2, "0")}>
      <Styled.Scanlines>{children}</Styled.Scanlines>
    </Styled.Background>
  );
};

export default Background;
