import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={50}
          height={25}
          priority
          className="filter invert backdrop-invert dark:filter-none mix-blend-multiply"
          quality={100}
        />
      </Link>
    </div>
  );
}
