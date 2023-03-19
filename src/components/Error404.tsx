import * as Styled from "./Error404.styles";
import Image from "next/image";

const Error404 = () => {
  return (
    <>
      <Styled.Error404 href="/">
        <Image
          alt="Error 404"
          fill
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src="/images/error-404.gif"
          style={{ objectFit: "contain" }}
        />
      </Styled.Error404>
    </>
  );
};

export default Error404;
