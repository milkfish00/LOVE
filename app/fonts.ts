import { Open_Sans } from "next/font/google";

// Centralized Google Font loading using next/font to avoid render-blocking @import
export const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: [
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
  ],
});
