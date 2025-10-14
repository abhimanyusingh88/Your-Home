// app/cabins/[cabinId]/page.js
import Cabin from "@/app/_components/Cabin";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";
import Reservation from "../../_components/Reservation";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;   // 👈 FIX
  const { name } = await getCabin(resolvedParams.cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  return cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
}

export default async function Page({ params }) {
  const resolvedParams = await params;   // 👈 FIX
  const cabin = await getCabin(resolvedParams.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
