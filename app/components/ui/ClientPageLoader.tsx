"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientPageLoader() {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Only show loader on /home route, exclude homepage (/)
    if (pathname !== "/home") {
      setShowLoader(false);
      return;
    }

    // Show loader for 3 seconds on /home page
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!showLoader) return null;

  return (
    <div
      className={`fixed inset-0 bg-white flex items-center justify-center transition-opacity duration-500 ${
        showLoader ? "opacity-100 z-[9999]" : "opacity-0 pointer-events-none"
      }`}>
      <div className="w-48 h-48 preloader">
        <svg
          viewBox="0 0 447 387"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full">
          <path
            d="M307.312 127.596C307.315 258.031 229.704 342.346 229.704 342.346C229.704 342.346 153.656 258.031 153.656 127.596C153.656 -2.83956 307.31 -2.8395 307.312 127.596Z"
            fill="transparent"
            className="svg-elem-1"
          />
          <path
            d="M38.464 164.603C89.7476 285.794 227.224 341.532 227.224 341.532C227.224 341.532 221.913 222.288 170.628 101.099C119.342 -20.0908 -12.8194 43.4124 38.464 164.603Z"
            fill="transparent"
            className="svg-elem-2"
          />
          <path
            d="M408.502 164.603C357.219 285.794 227.227 341.532 227.227 341.532C227.227 341.532 225.052 222.288 276.338 101.099C327.623 -20.0908 459.786 43.4124 408.502 164.603Z"
            fill="transparent"
            className="svg-elem-3"
          />
        </svg>
      </div>
    </div>
  );
}
