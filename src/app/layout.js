import { Montserrat } from "next/font/google";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";
import WhatsAppButton from "./_components/WhatappButton";
import AIChatButton from "./_components/aiChat";
// import WhatsAppButton from "./_components/WhatsAppButton"; // ✅ Add this line

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / The Wilderness",
    default: "The Wilderness",
  },
  description:
    "Luxurious cabin hotel, located at the great mountains of Himalayas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>

        {/* ✅ Floating WhatsApp Button (visible globally) */}

        <WhatsAppButton />
        <AIChatButton/>
      </body>
    </html>
  );
}
