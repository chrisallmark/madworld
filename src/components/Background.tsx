import { useEffect, useState } from "react";
import * as Styled from "./Background.styles";

const Background = ({ children }: React.PropsWithChildren) => {
  const [background, setBackground] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setBackground(Math.floor(Math.random() * 10));
    }, 30000);
  }, [background, setBackground]);
  return (
    <Styled.Background background={background}>
      <Styled.Scanlines>{children}</Styled.Scanlines>
    </Styled.Background>
  );
};

export default Background;
