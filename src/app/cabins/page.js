import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Filter from "../_components/filter";
import CabinList from "../_components/CabinList";
import ReservationReminder from "../_components/ReservationReminder";

// isr the middleground between fully static and fully dynamic (int sec means every 1 hr the data will be renewed)
// export const revalidate= 3600;
export const metadata = {
  title: "Cabins",
};

export default async function Page({ searchParams }) {
  // ✅ Await searchParams before accessing properties
  const params = await searchParams;
  const filter = params?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* suspense boundary so that static ui stays intact while loading */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
