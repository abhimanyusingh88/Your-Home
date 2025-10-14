import Link from "next/link";
import Image from "next/image";
import { auth } from "../_lib/auth";
import { MapPin } from "lucide-react"; // 👈 added icon import

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center relative">
        <li className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent-400" /> {/* 👈 added icon */}
          <Link
            href="/location"
            className="hover:text-accent-400 transition-colors"
          >
            location
          </Link>
        </li>

        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>

        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>

        <li className="relative group">
          <Link
            href="/account"
            className="flex items-center gap-2 hover:text-accent-400 transition-colors"
          >
            {session?.user ? (
              <>
                <Image
                  className="rounded-full"
                  src={session.user.image}
                  alt="Profile"
                  width={32}
                  height={32}
                />
                <span>Guest area</span>
              </>
            ) : (
              "Guest area"
            )}
          </Link>

          {session?.user?.name && (
            <div className="absolute top-12 right-0 bg-black text-white text-xs rounded-md px-2 py-1 shadow-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 whitespace-nowrap">
              {session.user.name}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
