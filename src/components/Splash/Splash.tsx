import Image from "next/image";
import Link from "next/link";

export default function Splash({ onClick }: { onClick: () => void }) {
  return (
    <>
      <Link
        href="/"
        onClick={onClick}
        style={{
          height: "100%",
          margin: "1em 0",
          maxHeight: "500px",
          maxWidth: "500px",
          position: "relative",
          width: "100%",
        }}
      >
        <Image
          alt="Madworld Splash"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src="/images/madworld-splash.png"
          style={{ objectFit: "contain" }}
        />
      </Link>
      <Image
        alt="ESRB"
        height="90"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src="/images/esrb-mature-17+.png"
        style={{
          bottom: "0",
          margin: "1em 0",
          position: "absolute",
        }}
        width="64"
      />
    </>
  );
}
