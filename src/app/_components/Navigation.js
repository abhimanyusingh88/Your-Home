import Link from "next/link";
import Image from "next/image";
import { auth } from "../_lib/auth";
import { MapPin, ChevronDown } from "lucide-react";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-lg font-medium">
      <ul className="flex gap-14 items-center relative">
        {/* Location */}
        <li className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent-400" />
          <Link
            href="/location"
            className="hover:text-accent-400 transition-colors duration-300"
          >
            Location
          </Link>
        </li>

        {/* Cabins */}
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors duration-300"
          >
            Cabins
          </Link>
        </li>

        {/* About */}
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors duration-300"
          >
            About
          </Link>
        </li>

        {/* Guest Area */}
        <li className="relative group">
          <div className="flex items-center gap-2 cursor-pointer select-none hover:text-accent-400 transition-colors duration-300">
            {session?.user ? (
              <>
                <Image
                  className="rounded-full border border-accent-300/40 shadow-md hover:shadow-lg transition-all duration-300"
                  src={session.user.image}
                  alt="Profile"
                  width={38}
                  height={38}
                />
                <span>Guest area</span>
                <ChevronDown className="w-4 h-4 text-accent-400 transition-transform duration-300 group-hover:rotate-180" />
              </>
            ) : (
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors duration-300"
              >
                Guest area
              </Link>
            )}
          </div>

          {/* Invisible hover bridge */}
          <div className="absolute top-10 right-0 w-full h-4"></div>

          {/* ↓↓↓ Compact Dropdown only ↓↓↓ */}
          {session?.user && (
            <div
              className="absolute top-11 right-0 min-w-[170px] bg-white/80 backdrop-blur-lg border border-accent-200/40 shadow-lg 
                         rounded-xl overflow-hidden transform scale-95 translate-y-2 opacity-0 
                         group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100 
                         transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <ul className="text-gray-800 text-[0.95rem]">
                <li>
                  <Link
                    href="/account"
                    className="block px-4 py-1.5 hover:bg-accent-50 hover:text-accent-600 transition-colors duration-200"
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account/reservations"
                    className="block px-4 py-1.5 hover:bg-accent-50 hover:text-accent-600 transition-colors duration-200"
                  >
                    Reservations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account/profile"
                    className="block px-4 py-1.5 hover:bg-accent-50 hover:text-accent-600 transition-colors duration-200"
                  >
                    Guest Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/feedback"
                    className="block px-4 py-1.5 hover:bg-accent-50 hover:text-accent-600 transition-colors duration-200"
                  >
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
