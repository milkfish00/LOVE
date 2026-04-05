"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Programs } from "@/app/lib/interface";
import { urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import { getProgramColors, getSubtleColors } from "@/app/lib/program-utils";

interface ProgramsSectionProps {
  data: Programs;
}

export default function ProgramsSection({ data }: ProgramsSectionProps) {
  const [activeTab, setActiveTab] = useState(
    data?.programSections?.[0]?.slug?.current || "",
  );

  const currentProgram = data?.programSections?.find(
    (program) => program.slug.current === activeTab,
  );

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
          {data.programSections.map((program, index) => {
            const boldColors = getProgramColors(index);
            const subtleColors = getSubtleColors(index);
            const colors =
              activeTab === program.slug.current ? boldColors : subtleColors;
            const isActive = activeTab === program.slug.current;
            return (
              <button
                key={program._key}
                onClick={() => setActiveTab(program.slug.current)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  colors.color
                } ${colors.textColor} ${
                  isActive
                    ? " scale-105"
                    : "opacity-90 hover:opacity-100 hover:scale-105"
                }`}>
                {program.programTitle}
              </button>
            );
          })}
        </div>

        {/* Tab Content - Cleaner layout */}
        {currentProgram && (
          <div className="overflow-hidden flex flex-col md:flex-row rounded-2xl ">
            <div className="grid lg:grid-cols-5 gap-0 max-w-4xl mx-auto">
              {/* Image Section - Takes more space */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-8 flex items-center justify-center">
                {(() => {
                  const imageUrl = getImageUrl(currentProgram.image);
                  return imageUrl ? (
                    <div className="relative w-full max-w-xs h-64">
                      <Image
                        src={imageUrl}
                        alt={currentProgram.programTitle}
                        fill
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 1024px) 50vw, 400px"
                        className="object-contain"
                      />
                    </div>
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
                <div className="inline-block bg-white  rounded-full px-4 py-1.5 mb-4">
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
}

// Remove the ProgramsSectionWrapper function from this file
