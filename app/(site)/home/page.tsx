// Server Component (remove "use client")
import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { homeQuery, programsQuery } from "@/app/lib/queries";
import { Programs } from "@/app/lib/interface";
import { sanityClient } from "@/app/lib/sanity";
import FAQAccordion from "@/app/components/ui/Faq";
import ProgramsSection from "@/app/components/Home/Tabs";
import { sanityFetch } from "@/sanity/lib/live";
import ProgramsSectionWrapper from "@/app/components/ProgramsSectionWrapper";

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Home | Love & Learning Child Care Center",
  description:
    "Welcome to Love & Learning Child Care Center. A safe, loving environment for early learning in Charlotte, NC.",
};

export default async function Home() {
  const query = homeQuery;
  const { data } = await sanityFetch({
    query,
    params: {},
  });

  const programsData: Programs = await sanityClient.fetch(programsQuery);

  // Optimize image URLs with proper dimensions and quality
  const getOptimizedImageUrl = (image: any, width: number, quality = 75) => {
    if (!image) return null;
    return urlFor(image).width(width).quality(quality).format('webp').auto('format').url();
  };

  return (
    <div>
      {/* Preconnect to Sanity CDN for faster image loading */}
      <link rel="preconnect" href="https://cdn.sanity.io" />
      <link rel="dns-prefetch" href="https://6jqzfkhy.apicdn.sanity.io" />
      <link rel="canonical" href="https://www.loveandlearning.net/home" />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Decorative flowers - converted to Next/Image with blur placeholder */}
        <div className="absolute top-0 right-0 z-30 w-38 md:w-64 lg:w-80">
          <Image
            src="/svg/flower3.svg"
            alt=""
            loading="lazy"
            width={320}
            height={320}
            className="w-full h-auto hover:rotate-180"
          />
        </div>

        <div className="absolute bottom-0 left-0 z-30 w-48 md:w-64 lg:w-80">
          <Image
            src="/svg/flower2.svg"
            alt=""
            loading="lazy"
            width={320}
            height={320}
            className="w-full h-auto hover:rotate-45"
          />
        </div>

        <div
          className="absolute inset-0 bg-black/50 z-10"
          aria-hidden="true"></div>

        {data?.heroSections?.[0]?.backgroundImage ? (
          <Image
            src={
              getOptimizedImageUrl(
                data.heroSections[0].backgroundImage,
                1920,
                85
              ) || urlFor(data.heroSections[0].backgroundImage).url()
            }
            alt="Children playing at Love & Learning Child Care Center"
            fill
            priority
            sizes="100vw"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
            className="object-cover"
          />
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

        <div className="absolute inset-0 flex items-center justify-center text-center z-20">
          <div className="max-w-3xl px-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              {data?.heroSections?.[0]?.headline}
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white">
              {data?.heroSections?.[0]?.description}
            </p>
            <a
              href={data?.heroSections?.[0]?.Button?.link}
              className="bg-white cursor-pointer text-[#000000] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              aria-label="Explore our childcare programs">
              Explore Our Programs
            </a>
          </div>
        </div>
      </section>

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
                  href={data?.aboutSections?.[0]?.button?.link}
                  rel="noopener noreferrer"
                  aria-label="Read more about Love & Learning Child Care Center"
                  className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg text-black bg-[#FAB391] hover:bg-[#f9a27d] transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FAB391]"
                >
                  {data?.aboutSections?.[0]?.button?.text}
                </a>
              </div>
            </div>

            {/* Image Section - Optimized with blur placeholder */}
            <div className="flex-1 w-full h-64 sm:h-80 md:h-96 lg:h-auto lg:min-h-[32rem] relative">
              <Image
                alt="Love & Learning Child Care Center environment"
                src={
                  getOptimizedImageUrl(data?.aboutSections?.[0]?.image, 800, 70) ||
                  urlFor(data?.aboutSections?.[0]?.image).url()
                }
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={70}
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
                  <div className="relative h-[300px]">
                    <Image
                      src={
                        getOptimizedImageUrl(
                          data?.cta1Sections?.[0]?.image,
                          600,
                          70
                        ) || urlFor(data?.cta1Sections?.[0]?.image).url()
                      }
                      alt="Students learning in classroom at Love & Learning"
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={70}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
                      className="object-cover md:rounded-2xl"
                    />
                  </div>
                  {/* Flower decoration */}
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
                  href={data?.cta1Sections?.[0]?.Button?.link}
                  className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg text-white bg-[#264f71] hover:opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#264f71]">
                  {data?.cta1Sections?.[0]?.Button?.text}
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
                  {data?.cta2Sections?.[0]?.Button?.text}
                </a>
              </div>

              <div className="lg:w-1/2 mt-12 lg:mt-0">
                <div className="relative">
                  <div className="relative h-[500px]">
                    <Image
                      src={
                        getOptimizedImageUrl(
                          data?.cta2Sections?.[0]?.image,
                          800,
                          70
                        ) || urlFor(data?.cta2Sections?.[0]?.image).url()
                      }
                      alt="Children playing and learning at Love & Learning"
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={70}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  {/* Flower decoration */}
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
        </div>
      </section>

      <FAQAccordion data={data} />
    </div>
  );
}