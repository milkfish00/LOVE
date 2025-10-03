"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PageLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Don't show loader on homepage
    if (pathname === "/") {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="w-48 h-48">
        <svg
          viewBox="0 0 447 387"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full">
          <path
            d="M307.312 127.596C307.315 258.031 229.704 342.346 229.704 342.346C229.704 342.346 153.656 258.031 153.656 127.596C153.656 -2.83956 307.31 -2.8395 307.312 127.596Z"
            fill="#E3AC4A"
            className="svg-elem-1"
          />
          <path
            d="M38.464 164.603C89.7476 285.794 227.224 341.532 227.224 341.532C227.224 341.532 221.913 222.288 170.628 101.099C119.342 -20.0908 -12.8194 43.4124 38.464 164.603Z"
            fill="#F5846F"
            className="svg-elem-2"
          />
          <path
            d="M408.502 164.603C357.219 285.794 227.227 341.532 227.227 341.532C227.227 341.532 225.052 222.288 276.338 101.099C327.623 -20.0908 459.786 43.4124 408.502 164.603Z"
            fill="#81AA8E"
            className="svg-elem-3"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes animate-svg-fill-1 {
          0% {
            fill: transparent;
          }
          100% {
            fill: rgb(227, 172, 74);
          }
        }

        @keyframes animate-svg-fill-2 {
          0% {
            fill: transparent;
          }
          100% {
            fill: rgb(245, 132, 111);
          }
        }

        @keyframes animate-svg-fill-3 {
          0% {
            fill: transparent;
          }
          100% {
            fill: rgb(129, 170, 142);
          }
        }

        .svg-elem-1 {
          animation: animate-svg-fill-1 2s cubic-bezier(0.19, 1, 0.22, 1) 0.8s
            both;
        }

        .svg-elem-2 {
          animation: animate-svg-fill-2 2s cubic-bezier(0.19, 1, 0.22, 1) 0.9s
            both;
        }

        .svg-elem-3 {
          animation: animate-svg-fill-3 2s cubic-bezier(0.19, 1, 0.22, 1) 1s
            both;
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
