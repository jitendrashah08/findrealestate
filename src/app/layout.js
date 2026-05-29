import { Instrument_Sans, Lora } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LenisScroll from "./components/LenisScroll";
import { Analytics } from "@vercel/analytics/next";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "FIND Real Estate | Purchase, Rent or Sell Commercial and Residential Real Estate",
  description: "Expert agents. Real guidance. A clear path to find what’s next.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${lora.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LenisScroll>
          <Header />
          {children}
          <Footer />
        </LenisScroll>
        <Analytics />
      </body>
    </html>
  );
}
