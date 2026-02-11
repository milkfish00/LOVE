import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { homeQuery, programsQuery, testimonialsQuery } from "@/app/lib/queries";
import { Programs, Testimonials } from "@/app/lib/interface";
import { sanityClient } from "@/app/lib/sanity";
import FAQAccordion from "@/app/components/ui/Faq";
import { sanityFetch } from "@/sanity/lib/live";
import ProgramsSectionWrapper from "@/app/components/ProgramsSectionWrapper";
import HeroSection from "@/app/components/Home/Hero";
import TestimonialsSlider from "@/app/components/ui/Testimonials";

export const revalidate = 60;

export const metadata: Metadata = {
  title:
    "Love & Learnin Child Care Center | Quality Early Learning in Fletcher, NC",
  description:
    "Welcome to Love & Learning Child Care Center. A safe, loving environment for early learning in Fletcher, NC. Experienced educators, age-appropriate programs, and nurturing care for your child.",
  alternates: {
    canonical: "https://www.loveandlearning.net",
  },
  openGraph: {
    title:
      "Love & Learning Child Care Center | Quality Early Learning in Fletcher, NC",
    description:
      "Welcome to Love & Learning Child Care Center. A safe, loving environment for early learning in Fletcher, NC.",
    url: "https://www.loveandlearning.net",
    type: "website",
  },
};

export default async function Home() {
  const query = homeQuery;
  const { data } = await sanityFetch({
    query,
    params: {},
  });

  const programsData: Programs = await sanityClient.fetch(programsQuery);
  const testimonialsData: Testimonials[] =
    await sanityClient.fetch(testimonialsQuery);

  const getOptimizedImageUrl = (image: any, width: number, quality = 75) => {
    if (!image) return null;
    return urlFor(image)
      .width(width)
      .quality(quality)
      .format("webp")
      .auto("format")
      .url();
  };

  const aboutBtnText =
    data?.aboutSections?.[0]?.button?.text || "Learn more about us";
  const cta1Text =
    data?.cta1Sections?.[0]?.Button?.text || "Get enrollment details";
  const cta2Text = data?.cta2Sections?.[0]?.Button?.text || "Contact us";

  return (
    <div>
      {/* Hero Section - Now a Client Component */}
      <HeroSection data={data} />

      <ProgramsSectionWrapper />

      {/* About Section */}
      <section
        className="bg-[#81AA8E] py-32 flex items-center justify-center p-4"
        aria-labelledby="about-heading">
        <div className="mx-auto max-w-7xl w-full">
          <div className="relative isolate overflow-hidden bg-white shadow-2xl rounded-3xl flex flex-col lg:flex-row lg:gap-x-8">
            {/* Text Section */}
            <div className="flex-1 max-w-xl mx-auto text-center px-6 py-12 lg:py-24 lg:mx-0 lg:text-left lg:pl-16 lg:pr-8">
              <h2
                id="about-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {data?.aboutSections?.[0]?.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                {data?.aboutSections?.[0]?.subtitle}
              </p>
              <div className="mt-8 flex items-center justify-center lg:justify-start">
                <a
                  href={data?.aboutSections?.[0]?.button?.link || "/about"}
                  rel="noopener noreferrer"
                  aria-label={aboutBtnText}
                  className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg text-black bg-[#FAB391] hover:bg-[#f9a27d] transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FAB391]">
                  {aboutBtnText}
                </a>
              </div>
            </div>

            {/* Image Section */}
            <div className="flex-1 w-full h-64 sm:h-80 md:h-96 lg:h-auto lg:min-h-128 relative">
              <Image
                alt="Love & Learning Child Care Center environment"
                src={
                  getOptimizedImageUrl(
                    data?.aboutSections?.[0]?.image,
                    800,
                    70,
                  ) || urlFor(data?.aboutSections?.[0]?.image).url()
                }
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
                className="object-cover lg:object-center rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA 1 Section */}
      <section className="py-20 bg-white" aria-labelledby="cta1-heading">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="lg:flex items-center gap-16">
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="relative h-125">
                    <Image
                      src={
                        getOptimizedImageUrl(
                          data?.cta1Sections?.[0]?.image,
                          600,
                          70,
                        ) || urlFor(data?.cta1Sections?.[0]?.image).url()
                      }
                      alt="Students learning in classroom at Love & Learning"
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={90}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
                      className="object-cover md:rounded-2xl"
                    />
                  </div>
                  <div
                    className="absolute -bottom-6 -left-6 w-32 h-32"
                    aria-hidden="true">
                    <Image
                      src="/svg/flower4.svg"
                      alt="Decorative flower"
                      loading="lazy"
                      width={128}
                      height={128}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 mt-12 lg:mt-0">
                <h2
                  id="cta1-heading"
                  className="text-4xl md:text-5xl font-bold mb-6">
                  {data?.cta1Sections?.[0]?.title}
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {data?.cta1Sections?.[0]?.subtitle}
                </p>
                <a
                  href={data?.cta1Sections?.[0]?.Button?.link || "/enroll"}
                  aria-label={cta1Text}
                  className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg text-white bg-[#264f71] hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#264f71]">
                  {cta1Text}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 2 Section */}
      <section className="py-20 bg-white" aria-labelledby="cta2-heading">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="lg:flex items-center gap-16">
              <div className="lg:w-1/2">
                <h2
                  id="cta2-heading"
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {data?.cta2Sections?.[0]?.title}
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {data?.cta2Sections?.[0]?.subtitle}
                </p>
                <a
                  href={data?.cta2Sections?.[0]?.Button?.link}
                  className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg text-white bg-[#F48573] hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F48573]">
                  {cta2Text}
                </a>
              </div>

              <div className="lg:w-1/2 mt-12 lg:mt-0">
                <div className="relative">
                  <div className="relative h-125">
                    <Image
                      src={
                        getOptimizedImageUrl(
                          data?.cta2Sections?.[0]?.image,
                          800,
                          70,
                        ) || urlFor(data?.cta2Sections?.[0]?.image).url()
                      }
                      alt="Children playing and learning at Love & Learning"
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={90}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  <div
                    className="absolute -top-6 -right-6 w-28 h-28"
                    aria-hidden="true">
                    <Image
                      src="/svg/flower5.svg"
                      alt="Decorative flower"
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
        </div>
      </section>
      <FAQAccordion data={data} />

      <TestimonialsSlider testimonials={testimonialsData} />
    </div>
  );
}
