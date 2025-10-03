"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import ChildData from "@/public/childern2.json";

// Import Lottie with no SSR to prevent document errors
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => null,
});

export default function NotFound() {
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);  

  useEffect(() => {
    setIsActive(true);
    setWindowHeight(window.innerHeight);

    // Update window height on resize
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Handle animation load
  const handleAnimationLoad = () => {
    setAnimationLoaded(true);
  };

  return (
    <div
      className={`relative w-full flex items-end justify-center overflow-hidden ${
        animationLoaded ? "bg-[#d0f2fb]" : "bg-transparent"
      }`}
      style={{ height: `${windowHeight}px` }}>
      <div className=" left-0 w-full flex flex-col items-center justify-center justify-items-center pt-6 z-10">
        <div className="absolute bottom-0 w-full h-auto hidden md:block z-0">
          <div className="w-full">
            <Lottie
              animationData={ChildData}
              loop={false}
              autoplay={true}
              onDOMLoaded={handleAnimationLoad}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
                progressiveLoad: false,
                hideOnTransparent: true,
              }}
            />
          </div>
        </div>
        <div
          className="absolute bottom-0 w-full h-auto md:hidden z-0"
          style={{ maxHeight: `${windowHeight}px` }}>
          <div className="w-full h-full">
            <Lottie
              animationData={ChildData}
              loop={false}
              autoplay={true}
              onDOMLoaded={handleAnimationLoad}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
              }}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid meet",
                progressiveLoad: false,
                hideOnTransparent: true,
              }}
            />
          </div>
        </div>
      </div>
      <div className="max-w-xs sm:max-w-sm md:max-w-md w-full text-center lg:left-20 top-4 md:top-8 absolute z-10 px-4">
         {/* 404 Number */}
         <div className="mb-4 md:mb-8">
           <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-[#000000]">
             404
           </h1>
           <div className="w-16 sm:w-24 md:w-32 h-1 bg-[#000000] mx-auto mt-2 md:mt-4 rounded-full"></div>
         </div>

         {/* Error Message */}
         <div className="mb-6 md:mb-10">
           <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#000000] mb-3 md:mb-6">
             Oops! Page Not Found.
           </h2>
           <p className="text-sm sm:text-base md:text-lg text-[#000000] leading-relaxed">
             The page you're looking for doesn't exist. It might have been moved,
             deleted, or you entered the wrong URL.
           </p>
         </div>

         {/* Action Buttons */}
         <div className="space-y-2 md:space-y-4">
           <Link
             href="/home"
             className="inline-block w-full bg-[#000000] text-white font-semibold py-2 px-4 md:py-4 md:px-8 rounded-full transition duration-300 transform hover:bg-white/80 hover:text-black text-sm md:text-base">
             Go Back Home
           </Link>

           <button
             onClick={() => router.back()}
             className="inline-block w-full bg-white text-[#000000] font-semibold py-2 px-4 md:py-4 md:px-8 rounded-full transition duration-300 hover:bg-white/50 border-2 border-black text-sm md:text-base">
             Go Back
           </button>
         </div>

        {/* Additional decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 opacity-20">
          <img
            src="/svg/flower3.svg"
            alt="Decorative flower"
            className="w-full h-auto"
          />
        </div>

        <div className="absolute -bottom-4 -right-4 w-6 h-6 opacity-20">
          <img
            src="/svg/flower4.svg"
            alt="Decorative flower"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
 