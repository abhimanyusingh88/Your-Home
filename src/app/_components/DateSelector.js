"use client";
import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";
import { useState, useEffect } from "react"; // 👈 added useEffect
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
// it will make sure if a range is alreadyy booked then cant e booked that range
function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {
  const { range, setRange } = useReservation(); // 👈 added version
  const { minBookingLength, maxBookingLength } = settings;
  const { regularPrice, discount } = cabin;
  console.log(bookedDates);
  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const resetRange = () => setRange({ from: undefined, to: undefined });

  const numNights =
    range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;

  const cabinPrice = numNights * (regularPrice - discount);

  // useEffect(() => {
  //   setRange({ from: null, to: null }); // 👈 added effect to globally reset
  // }, [version]);

  return (
    <div className="flex flex-col justify-between">
      <p className=" items-center font-bold text-md">Pick atleast {minBookingLength} days and max upto {maxBookingLength}</p>
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        selected={displayRange}
        min={minBookingLength}
        max={maxBookingLength}
        onSelect={setRange}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={[
    (currdate) => isPast(currdate),
    (currdate) => bookedDates.some(date => isSameDay(date, currdate))
  ]}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex flex-col gap-1">
          <p className="flex gap-2 items-baseline">
            <span className="text-2xl font-semibold">{regularPrice}$</span>
            <span className="text-2xl font-semibold">/night</span>
          </p>
          {discount > 0 && (
            <p className="text-sm text-primary-700">
              Discount: {discount}$ off/night
            </p>
          )}
        </div>

        {range?.from && range?.to ? (
          <div className="flex flex-row gap-10 items-end">
            <p className="text-sm font-bold text-xl mb-1">
              {numNights} nights · {cabinPrice}$
            </p>
            <button
              className="border border-primary-800 py-1 px-3 mt-2 text-sm font-semibold"
              onClick={resetRange}
            >
              Clear
            </button>
          </div>
        ) : null}
      </div>

      <div className="text-center mt-4">
        {range?.from && range?.to ? (
          <p>
            Selected: {range.from.toDateString()} → {range.to.toDateString()}
          </p>
        ) : (
          <p>No range selected</p>
        )}
    
      </div>
    </div>
  );
}

export default DateSelector;
