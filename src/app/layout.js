import { Montserrat } from "next/font/google";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";
import WhatsAppButton from "./_components/WhatappButton";
// import AIChatButton from "./_components/aiChat";
import { Toaster } from "react-hot-toast";
import SelfPageScrollUp from "./_components/SelfPageScrollUp";
import AIChatButton from "./_components/AiChat";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / Your Home",
    default: "Your Home",
  },
  description:
    "Luxurious cabin hotel, located at the great mountains of Himalayas",
  icons: {
    icon: "/homee.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col overflow-x-hidden w-full relative`}
      >
        <Header />

        <div className="flex-1 px-4 py-6 md:px-8 md:py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>

        <WhatsAppButton />
        <AIChatButton />
        <SelfPageScrollUp />



        <footer className="text-center py-6 border-t border-primary-800 text-sm text-primary-400">
          © {new Date().getFullYear()} The Your-Home & Family. All rights reserved.
        </footer>
        {/* <SelfPageScrollUp/> */}

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#facc15",
              color: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "14px 18px",
              fontWeight: "500",
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              backdropFilter: "blur(8px)",
            },
            success: {
              icon: "😀",
            },
            error: {
              icon: "⚠️",
              style: {
                background: "#f87171",
                color: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
