"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Error404 = styled(Link)`
  height: 100%;
  margin: 1em 0;
  max-height: 354px;
  max-width: 819px;
  position: relative;
  width: 100%;
`;

export default function () {
  return (
    <>
      <Error404 href="/">
        <Image
          alt="Error 404"
          fill
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src="/images/error-404.gif"
          style={{ objectFit: "contain" }}
        />
      </Error404>
    </>
  );
}
