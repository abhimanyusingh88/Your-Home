"use client"
import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import ImageModal from "./imageModal";
import { useState } from "react";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex border border-primary-800">
        <div
          className="relative flex-1 group cursor-pointer overflow-hidden"
          onClick={() => setOpen(!open)}
        >
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            className="object-cover border-r border-primary-800 transition-transform duration-500 group-hover:scale-105"
          />

          {/* Modern hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
            <p className="text-white text-lg font-semibold tracking-wide">
              Click to view
            </p>
          </div>
        </div>

        <div className="flex-grow">
          <div className="pt-5 pb-4 px-7 bg-primary-950">
            <h3 className="text-accent-500 font-semibold text-2xl mb-3">
              Cabin {name}
            </h3>

            <div className="flex gap-3 items-center mb-2">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <p className="text-lg text-primary-200">
                For up to <span className="font-bold">{maxCapacity}</span> guests
              </p>
            </div>

            <p className="flex gap-3 justify-end items-baseline">
              {discount > 0 ? (
                <>
                  <span className="text-3xl font-[350]">
                    ${regularPrice - discount}
                  </span>
                  <span className="line-through font-semibold text-primary-600">
                    ${regularPrice}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-[350]">${regularPrice}</span>
              )}
              <span className="text-primary-200">/ night</span>
            </p>
          </div>

          <div className="bg-primary-950 border-t border-t-primary-800 text-right">
            <Link
              href={`/cabins/${id}`}
              className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
            >
              Details & reservation &rarr;
            </Link>
          </div>
        </div>
      </div>

      <ImageModal
        open={open}
        onClose={() => setOpen(false)}
        src={image}
        alt={`Cabin ${name}`}
      />
    </>
  );
}

export default CabinCard;
