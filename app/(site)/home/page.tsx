// Server Component (remove "use client")
import React from "react";
import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";
import { homeQuery, programsQuery } from "@/app/lib/queries";
import { homeInterface, Programs } from "@/app/lib/interface";
import { sanityClient } from "@/app/lib/sanity";
import FAQAccordion from "@/app/components/ui/Faq";
import ProgramsSection from "@/app/components/Home/Tabs";
import { sanityFetch } from "@/sanity/lib/live";

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Love & Learning Child Care Center. A safe, loving environment for early learning in Charlotte, NC.",
};

export default async function Home() {
  const query = homeQuery;
  //const data: homeInterface = await sanityClient.fetch(query);
  const { data } = await sanityFetch({
    query,
    params: {},
  });

  const programsData: Programs = await sanityClient.fetch(programsQuery);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute top-0 right-0 z-30 w-38 md:w-64 lg:w-80">
          <img
            src="/svg/flower3.svg"
            alt="Decorative flowers"
            className="w-full h-auto hover:rotate-180"
          />
        </div>

        <div className="absolute bottom-0 left-0 z-30 w-48 md:w-64 lg:w-80">
          <img
            src="/svg/flower2.svg"
            alt="Decorative flowers"
            className="w-full h-auto hover:rotate-45"
          />
        </div>

        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {data?.heroSections?.[0]?.backgroundImage ? (
          <img
            src={urlFor(data.heroSections[0].backgroundImage).url()}
            alt="Children playing"
            className="w-full h-full object-cover absolute inset-0"
          />
        ) : (
          <img
            src="/hero.jpeg"
            alt="Children playing"
            className="w-full h-full object-cover absolute inset-0"
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
              className="bg-white cursor-pointer text-[#000000] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
              Explore Our Programs
            </a>
          </div>
        </div>
      </section>
      <ProgramsSection data={programsData} />

      {/* About Section */}
      <div className="bg-[#81AA8E] min-h-screen flex items-center justify-center p-4">
        <div className="mx-auto max-w-7xl w-full">
          <div className="relative isolate overflow-hidden bg-white shadow-2xl rounded-3xl flex flex-col lg:flex-row lg:gap-x-8">
            {/* Text Section */}
            <div className="flex-1 max-w-xl mx-auto text-center px-6 py-12 lg:py-24 lg:mx-0 lg:text-left lg:pl-16 lg:pr-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {data?.aboutSections?.[0]?.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                {data?.aboutSections?.[0]?.subtitle}
              </p>
              <div className="mt-8 flex items-center justify-center lg:justify-start">
                <a
                  href={data?.aboutSections?.[0]?.button?.link}
                  className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg text-black bg-[#FAB391] hover:bg-[#f9a27d] transition-all duration-300 transform ">
                  {data?.aboutSections?.[0]?.button?.text}
                </a>
              </div>
            </div>

            {/* Image Section */}
            <div className="flex-1 w-full h-64 sm:h-80 md:h-96 lg:h-auto lg:min-h-[32rem]">
              <img
                alt="App screenshot"
                src={urlFor(data?.aboutSections?.[0]?.image).url()}
                className="w-full h-full object-cover lg:object-center rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA 1 Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="lg:flex items-center gap-16">
              <div className="lg:w-1/2">
                <div className="relative">
                  <img
                    src={urlFor(data?.cta1Sections?.[0]?.image).url()}
                    alt="Students learning in classroom"
                    className="w-full h-[300px] object-cover md:rounded-2xl"
                  />
                  {/* Flower decoration */}
                  <div className="absolute -bottom-6 -left-6 w-32 h-32">
                    <img
                      src="/svg/flower4.svg"
                      alt="Decorative flower"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 mt-12 lg:mt-0">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {data?.cta1Sections?.[0]?.title}
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {data?.cta1Sections?.[0]?.subtitle}
                </p>
                <a
                  href={data?.cta1Sections?.[0]?.Button?.link}
                  className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg text-white bg-[#264f71] hover:opacity-90 transition-opacity duration-300">
                  {data?.cta1Sections?.[0]?.Button?.text}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 2 Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="lg:flex items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {data?.cta2Sections?.[0]?.title}
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {data?.cta2Sections?.[0]?.subtitle}
                </p>
                <a
                  href={data?.cta2Sections?.[0]?.Button?.link}
                  className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg text-white bg-[#F48573] hover:opacity-90 transition-opacity duration-300">
                  {data?.cta2Sections?.[0]?.Button?.text}
                </a>
              </div>

              <div className="lg:w-1/2 mt-12 lg:mt-0">
                <div className="relative">
                  <img
                    src={urlFor(data?.cta2Sections?.[0]?.image).url()}
                    alt="Children playing and learning"
                    className="w-full h-[500px] object-cover rounded-2xl"
                  />
                  {/* Flower decoration */}
                  <div className="absolute -top-6 -right-6 w-28 h-28">
                    <img
                      src="/svg/flower5.svg"
                      alt="Decorative flower"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section 
      <SliderComponent data={data} />*/}
      <FAQAccordion data={data} />
    </div>
  );
}
