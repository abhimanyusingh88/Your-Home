"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const validFilters = ["all", "small", "medium", "large"];
  const active = validFilters.includes(searchParams.get("capacity"))
    ? searchParams.get("capacity")
    : "all";

  function handleFilter(capacity) {
    const params = new URLSearchParams(searchParams.toString());
    if (capacity === "all") {
      params.delete("capacity");
    } else {
      params.set("capacity", capacity);
    }
    router.push(
      params.toString() ? `${pathName}?${params.toString()}` : pathName
    );
  }

  function btnClasses(value) {
    return `px-5 py-2 hover:bg-primary-700 ${
      active === value ? "bg-primary-800 text-white" : ""
    }`;
  }

  return (
    <div className="border border-primary-800 flex">
      <button onClick={() => handleFilter("all")} className={btnClasses("all")}>
        All cabins
      </button>
      <button
        onClick={() => handleFilter("small")}
        className={btnClasses("small")}
      >
        1&mdash;3 guests
      </button>
      <button
        onClick={() => handleFilter("medium")}
        className={btnClasses("medium")}
      >
        4&mdash;7 guests
      </button>
      <button
        onClick={() => handleFilter("large")}
        className={btnClasses("large")}
      >
        8&mdash;12 guests
      </button>
    </div>
  );
}

export default Filter;
