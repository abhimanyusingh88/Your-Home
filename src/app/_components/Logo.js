import Link from "next/link";
import Image from "next/image";
import homee from "../../../public/homee.png";
// import your-home from "../../public/"

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={homee}
        height={60}
        width={60}
        alt="The Wild Oasis logo"
        quality={100}
        className="rounded-full w-16 h-16 object-cover" // Added classes here
        priority
      />
      <span className="text-xl font-semibold text-primary-100">
        YOUR HOME
      </span>
    </Link>
  );
}

export default Logo;
