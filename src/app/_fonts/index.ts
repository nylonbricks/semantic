import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

export const Pretendard = localFont({
  display: "swap",
  preload: true,
  src: "./PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
});

export const GeistMono = Geist_Mono({
  display: "swap",
  preload: true,
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
