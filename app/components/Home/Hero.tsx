"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface HeroSectionProps {
  data: any;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation immediately
    setIsVisible(true);
  }, []);

  return (
    <section
      className={`relative h-screen flex items-center justify-center transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}>
      {/* Decorative flowers with bloom animation */}
      <div
        className={`absolute top-0 right-0 z-30 w-38 md:w-64 lg:w-80 transition-all duration-1000 ease-out ${
          isVisible
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0"
        }`}
        style={{ transitionDelay: "200ms" }}>
        <Image
          src="/svg/flower3.svg"
          alt="Decorative flower"
          loading="lazy"
          width={320}
          height={320}
          className="w-full h-auto hover:rotate-180 transition-transform duration-500"
        />
      </div>

      <div
        className={`absolute bottom-0 left-0 z-30 w-48 md:w-64 lg:w-80 transition-all duration-1000 ease-out ${
          isVisible
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-90 opacity-0"
        }`}
        style={{ transitionDelay: "400ms" }}>
        <Image
          src="/svg/flower2.svg"
          alt="Decorative flower"
          loading="lazy"
          width={320}
          height={320}
          className="w-full h-auto hover:rotate-45 transition-transform duration-500"
        />
      </div>

      <div
        className="absolute inset-0 bg-black/50 z-10"
        aria-hidden="true"></div>

      {/* Background Image - Loads immediately */}
      {data?.heroSections?.[0]?.backgroundImage ? (
        (() => {
          const heroSrc = urlFor(data.heroSections[0].backgroundImage)
            .width(1920)
            .quality(85)
            .format("webp")
            .url();
          const blurSrc = urlFor(data.heroSections[0].backgroundImage)
            .width(24)
            .quality(20)
            .url();

          return (
            <Image
              src={heroSrc}
              alt="Children playing at Love & Learning Child Care Center"
              fill
              priority
              sizes="100vw"
              quality={85}
              placeholder="blur"
              blurDataURL={blurSrc}
              className="object-cover"
            />
          );
        })()
      ) : (
        <Image
          src="/hero.jpeg"
          alt="Children playing at Love & Learning Child Care Center"
          fill
          priority
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
          className="object-cover"
        />
      )}

      {/* Text Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center z-20">
        <div className="max-w-3xl px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {data?.heroSections?.[0]?.headline}
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white">
            {data?.heroSections?.[0]?.description}
          </p>
          <a
            href={data?.heroSections?.[0]?.Button?.link || "#programs"}
            className="bg-white cursor-pointer text-[#000000] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            aria-label="Explore our childcare programs">
            {data?.heroSections?.[0]?.Button?.text || "Explore our programs"}
            <span className="screen-reader-text">Hidden</span>
          </a>
        </div>
      </div>
    </section>
  );
}
