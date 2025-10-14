"use client";

import Image from "next/image";
import errorImg from "../../public/error.png"; // renamed to avoid clash

export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <Image
        src={errorImg}
        alt="Error illustration"
        width={320}
        height={400}
        className="mix-blend-screen opacity-95"
        priority
      />

      <h1 className="text-3xl font-semibold text-white">Something went wrong!</h1>
      <p className="text-lg text-gray-300">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
