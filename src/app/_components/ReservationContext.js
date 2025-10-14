"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

export function ReservationProvider({ children }) {
  const [range, setRange] = useState({ from: null, to: null });
  const [version, setVersion] = useState(0); // 👈 added

  function resetRange() {
    setRange({ from: null, to: null });
    // setVersion(v => v + 1); // 👈 added
  }

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange, version }}> {/* 👈 updated */}
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  return useContext(ReservationContext);
}
