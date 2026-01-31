import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";

export const Pretendard = localFont({
  src: "./PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  preload: true,
});

export const RobotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  preload: true,
});
