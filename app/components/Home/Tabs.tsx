"use client";
import React, { useState } from "react";
import { programsQuery } from "@/app/lib/queries";
import { Programs } from "@/app/lib/interface";
import { sanityClient, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";

interface ProgramsSectionProps {
  data: Programs;
}

const ProgramsSection = ({ data }: ProgramsSectionProps) => {
  const [activeTab, setActiveTab] = useState(
    data?.programSections?.[0]?.slug?.current || ""
  );

  const programColors: Record<string, { color: string; textColor: string }> = {
    infants: { color: "bg-[#E68978]", textColor: "text-white" },
    toddlers: { color: "bg-[#EB9D73]", textColor: "text-white" },
    twos: { color: "bg-[#F4BC5C]", textColor: "text-white" },
    threes: { color: "bg-[#859989]", textColor: "text-white" },
    "fours-and-fives": { color: "bg-[#445f80]", textColor: "text-white" },
    sixes: { color: "bg-[#A085A0]", textColor: "text-white" },
  };

  const currentProgram = data?.programSections?.find(
    (program) => program.slug.current === activeTab
  );

  const getProgramColors = (slug: string) => {
    return (
      programColors[slug] || {
        color: "bg-gray-500",
        textColor: "text-white",
      }
    );
  };

  const getImageUrl = (imageAsset: any) => {
    if (imageAsset?.asset?._ref) {
      return urlFor(imageAsset).width(400).quality(80).url();
    }
    return null;
  };

  if (!data || !data.programSections || data.programSections.length === 0) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Programs
          </h2>
          <p className="text-gray-600">No programs available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header - Simplified */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            {data.title || "Our Programs"}
          </h2>
        </div>

        {/* Tab Navigation - More compact */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {data.programSections.map((program) => {
            const colors = getProgramColors(program.slug.current);
            const isActive = activeTab === program.slug.current;
            return (
              <button
                key={program._key}
                onClick={() => setActiveTab(program.slug.current)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  colors.color
                } ${colors.textColor} ${
                  isActive
                    ? "shadow-lg scale-105"
                    : "opacity-80 hover:opacity-100 hover:scale-105"
                }`}>
                {program.programTitle}
              </button>
            );
          })}
        </div>

        {/* Tab Content - Cleaner layout */}
        {currentProgram && (
          <div className="bg-white overflow-hidden flex flex-col md:flex-row rounded-2xl ">
            <div className="grid lg:grid-cols-5 gap-0 max-w-3xl mx-auto">
              {/* Image Section - Takes more space */}
              <div className="lg:col-span-2 bg-gray-50 p-8 flex items-center justify-center">
                {(() => {
                  const imageUrl = getImageUrl(currentProgram.image);
                  return imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={currentProgram.programTitle}
                      className="w-full max-w-xs h-64 object-contain"
                    />
                  ) : (
                    <div className="w-full h-64 flex items-center justify-center">
                      <h3 className="text-gray-400 text-lg ">
                        {currentProgram.programTitle}
                      </h3>
                    </div>
                  );
                })()}
              </div>

              {/* Content Section - Streamlined */}
              <div className="lg:col-span-3 p-8 md:p-12">
                <div className="inline-block bg-gray-100 rounded-full px-4 py-1.5 mb-4">
                  <span className="text-sm font-semibold text-gray-700">
                    {currentProgram.ageRange}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold pb-3 text-gray-800 mb-6 pally">
                  {currentProgram.programTitle}
                </h3>

                <div className="text-gray-600 leading-relaxed mb-8 line-clamp-4">
                  <PortableText value={currentProgram.description} />
                </div>

                <a
                  href={`/programs/${currentProgram.slug.current}`}
                  className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 group font-medium text-sm">
                  View Program
                  <svg
                    className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export async function ProgramsSectionWrapper() {
  const query = programsQuery;
  const data: Programs = await sanityClient.fetch(query);

  return <ProgramsSection data={data} />;
}

export default ProgramsSection;
