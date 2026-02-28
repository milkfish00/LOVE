import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { homeQuery, testimonialsQuery } from "@/app/lib/queries";
import { Testimonials } from "@/app/lib/interface";
import { sanityClient } from "@/app/lib/sanity";
import FAQAccordion from "@/app/components/ui/Faq";
import { sanityFetch } from "@/sanity/lib/live";
import ProgramsSectionWrapper from "@/app/components/ProgramsSectionWrapper";
import HeroSection from "@/app/components/Home/Hero";
import TestimonialsSlider from "@/app/components/ui/Testimonials";

export const revalidate = 60;

export const metadata: Metadata = {
  title:
    "Love & Learning Child Care Center | Quality Early Learning in Fletcher, NC",
  description:
    "Welcome to Love & Learning Child Care Center. A safe, loving environment for early learning in Fletcher, NC. Experienced educators, age-appropriate programs, and nurturing care for your child.",
  alternates: { canonical: "https://www.loveandlearning.net" },
  openGraph: {
    title:
      "Love & Learning Child Care Center | Quality Early Learning in Fletcher, NC",
    description:
      "Welcome to Love & Learning Child Care Center. A safe, loving environment for early learning in Fletcher, NC.",
    url: "https://www.loveandlearning.net",
    type: "website",
  },
};

const C = {
  green: "#F0F7F1",
  peach: "#f9e6c3",
  blueLight: "#EEF3F8",
  white: "#FFFFFF",
  footer: "#4c4164",
};

function WaveDivider({
  fromColor,
  toColor,
  flip = false,
}: {
  fromColor: string;
  toColor: string;
  flip?: boolean;
}) {
  return (
    <div
      className="w-full overflow-hidden leading-none"
      style={{ background: toColor }}>
      <svg
        viewBox="0 0 1440 72"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-10 md:h-18 block"
        style={{ transform: flip ? "scaleX(-1)" : "none" }}>
        <path d="M0,0 C360,72 1080,0 1440,48 L1440,0 Z" fill={fromColor} />
      </svg>
    </div>
  );
}

export default async function Home() {
  const { data } = await sanityFetch({ query: homeQuery, params: {} });
  const testimonialsData: Testimonials[] =
    await sanityClient.fetch(testimonialsQuery);

  const aboutBtnText = data?.aboutSections?.[0]?.button?.text || "Learn More";
  const cta1Text = data?.cta1Sections?.[0]?.Button?.text || "Enroll Now";
  const cta2Text = data?.cta2Sections?.[0]?.Button?.text || "Get Started";

  function img(image: any, width: number, quality = 80) {
    if (!image) return null;
    return urlFor(image)
      .width(width)
      .quality(quality)
      .format("webp")
      .auto("format")
      .url();
  }

  const BLUR =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q==";

  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <HeroSection data={data} />

      {/* ── About (green) ─────────────────────────────────────────────────── */}
      <section
        className="py-20 px-6 lg:px-8"
        style={{ background: C.green }}
        aria-labelledby="about-heading">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-stretch gap-12 lg:gap-20">
            <div className="w-full md:w-[52%] shrink-0 order-2 md:order-1">
              <div className="relative w-full h-full min-h-105 md:min-h-125 overflow-hidden rounded-2xl">
                <Image
                  alt="Children at Love & Learning"
                  src={
                    img(data?.aboutSections?.[0]?.image, 1200, 85) ||
                    urlFor(data?.aboutSections?.[0]?.image).url()
                  }
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 52vw"
                  quality={85}
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={BLUR}
                />
              </div>
            </div>

            <div className="w-full md:w-[48%] flex flex-col justify-center items-center md:items-start py-4 order-1 md:order-2 text-center md:text-left">
              <h2
                id="about-heading"
                className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
                {data?.aboutSections?.[0]?.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {data?.aboutSections?.[0]?.subtitle}
              </p>
              <a
                href={data?.aboutSections?.[0]?.button?.link || "/about"}
                className="inline-flex items-center px-7 py-3 rounded-full font-semibold text-base text-black bg-[#FAB391] hover:bg-[#f9a27d] transition-colors duration-300 focus:outline-none w-fit mx-auto md:mx-0">
                {aboutBtnText}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* green → peach */}
      <WaveDivider fromColor={C.green} toColor={C.peach} flip />

      {/* ── Testimonials (peach) ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 px-6 lg:px-8"
        style={{ background: C.peach }}
        aria-label="testimonials-section">
        <img
          src="/svg/flower6.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-0 left-0 w-72 h-72 object-contain opacity-[0.07] rotate-180"
        />
        <img
          src="/svg/flower6.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute bottom-0 right-0 w-72 h-72 object-contain opacity-[0.07]"
        />
        <div className="mx-auto max-w-6xl relative z-10">
          <TestimonialsSlider testimonials={testimonialsData} />
        </div>
      </section>

      {/* peach → blueLight */}
      <WaveDivider fromColor={C.peach} toColor={C.white} />

      {/* ── CTA 1 (pale blue) ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8" aria-labelledby="cta1-heading">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
            <div className="w-full lg:w-[52%] shrink-0">
              <div className="relative">
                <div className="relative w-full h-full min-h-105 md:min-h-125 overflow-hidden rounded-2xl">
                  <Image
                    src={
                      img(data?.cta1Sections?.[0]?.image, 1600, 90) ||
                      urlFor(data?.cta1Sections?.[0]?.image).url()
                    }
                    alt="Students learning at Love & Learning"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 52vw"
                    quality={90}
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={BLUR}
                  />
                </div>
                <div
                  className="absolute -bottom-6 -left-6 w-32 h-32"
                  aria-hidden="true">
                  <Image
                    src="/svg/flower4.svg"
                    alt=""
                    loading="lazy"
                    width={128}
                    height={128}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[48%] flex flex-col justify-center py-4">
              <h2
                id="cta1-heading"
                className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
                {data?.cta1Sections?.[0]?.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {data?.cta1Sections?.[0]?.subtitle}
              </p>
              <a
                href={data?.cta1Sections?.[0]?.Button?.link || "/enroll"}
                className="inline-flex items-center px-7 py-3 rounded-full font-semibold text-base text-white bg-[#264f71] hover:opacity-90 transition-opacity focus:outline-none w-fit">
                {cta1Text}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* blueLight → green */}
      <WaveDivider fromColor={C.white} toColor={C.green} flip />

      {/* ── Programs (green) ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8" style={{ background: C.green }}>
        <div className="mx-auto max-w-6xl">
          <ProgramsSectionWrapper />
        </div>
      </section>

      {/* green → white */}
      <WaveDivider fromColor={C.green} toColor={C.white} />

      {/* ── CTA 2 (white) ─────────────────────────────────────────────────── */}
      <section
        className="py-20 px-6 lg:px-8 bg-white"
        aria-labelledby="cta2-heading">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
            <div className="w-full lg:w-[48%] flex flex-col justify-center py-4 order-2 lg:order-1">
              <h2
                id="cta2-heading"
                className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
                {data?.cta2Sections?.[0]?.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {data?.cta2Sections?.[0]?.subtitle}
              </p>
              <a
                href={data?.cta2Sections?.[0]?.Button?.link}
                className="inline-flex items-center px-7 py-3 rounded-full font-semibold text-base text-white bg-[#F48573] hover:opacity-90 transition-opacity focus:outline-none w-fit">
                {cta2Text}
              </a>
            </div>

            <div className="w-full lg:w-[52%] shrink-0 order-1 lg:order-2">
              <div className="relative">
                <div className="relative w-full h-full min-h-105 md:min-h-125 overflow-hidden rounded-2xl">
                  <Image
                    src={
                      img(data?.cta2Sections?.[0]?.image, 1600, 90) ||
                      urlFor(data?.cta2Sections?.[0]?.image).url()
                    }
                    alt="Children playing at Love & Learning"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 52vw"
                    quality={90}
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={BLUR}
                  />
                </div>
                <div
                  className="absolute -top-6 -right-6 w-28 h-28"
                  aria-hidden="true">
                  <Image
                    src="/svg/flower5.svg"
                    alt=""
                    loading="lazy"
                    width={112}
                    height={112}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* white → green */}
      <WaveDivider fromColor={C.white} toColor={C.green} flip />

      {/* ── FAQ (green) ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8" style={{ background: C.green }}>
        <div className="mx-auto max-w-6xl">
          <FAQAccordion data={data} />
        </div>
      </section>

      {/* green → footer */}
      <WaveDivider fromColor={C.green} toColor={C.footer} />
    </div>
  );
}
