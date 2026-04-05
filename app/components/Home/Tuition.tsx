"use client";
import React from "react";
import { Programs } from "@/app/lib/interface";

interface TuitionRatesSectionProps {
  data: Programs;
}

export default function TuitionRatesSection({
  data,
}: TuitionRatesSectionProps) {
  // Brand color palette with gradients for Tuition section (randomized order)
  const brandColorPalette = [
    {
      color: "bg-[#e68979]",
      gradient: "from-[#e68979] to-[#d67261]",
    }, // Coral
    {
      color: "bg-[#6a9b8a]",
      gradient: "from-[#6a9b8a] to-[#587a77]",
    }, // Sage Green
    {
      color: "bg-[#445f80]",
      gradient: "from-[#445f80] to-[#354d6e]",
    }, // Navy Blue
    {
      color: "bg-[#F79A6B]",
      gradient: "from-[#F79A6B] to-[#e17e50]",
    }, // Peach
    {
      color: "bg-[#edc35d]",
      gradient: "from-[#edc35d] to-[#dab34a]",
    }, // Muted Teal
    {
      color: "bg-[#A684A3]",
      gradient: "from-[#A684A3] to-[#907087]",
    }, // Purple
    {
      color: "bg-[#E3AC4A]",
      gradient: "from-[#E3AC4A] to-[#d0983a]",
    }, // Gold
    {
      color: "bg-[#81AA8E]",
      gradient: "from-[#81AA8E] to-[#6d947a]",
    }, // Muted Green
    {
      color: "bg-[#eb9d73]",
      gradient: "from-[#eb9d73] to-[#d98b61]",
    }, // Orange
    {
      color: "bg-[#80739C]",
      gradient: "from-[#80739C] to-[#6b627f]",
    }, // Dark Purple
  ];

  const getProgramColors = (index: number) => {
    const colorIndex = index % brandColorPalette.length;
    return (
      brandColorPalette[colorIndex] || {
        color: "bg-gray-500",
        gradient: "from-gray-500 to-gray-600",
      }
    );
  };

  if (!data || !data.programSections || data.programSections.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Tuition Rates
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Quality child care with transparent, family-friendly rates
          </p>
        </div>

        {/* Tuition Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.programSections.map((program, index) => {
            const colors = getProgramColors(index);

            return (
              <div
                key={program._key}
                className="bg-white rounded-2xl shadow-md transition-all duration-300 overflow-hidden group">
                {/* Colored Header */}
                <div
                  className={`bg-gradient-to-br ${colors.gradient} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold uppercase tracking-wide opacity-90">
                      {program.ageRange}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">
                    {program.programTitle}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Tuition Rate */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-2xl font-bold text-gray-800">
                        {program.tuitionRates || "Contact Us"}
                      </span>
                    </div>
                  </div>

                  {/* Program Details */}
                  <div className="space-y-3 mb-6 border-t border-gray-100 pt-4">
                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Schedule
                        </p>
                        <p className="text-sm text-gray-600">
                          {program.schedule || "Full-time"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Class Size
                        </p>
                        <p className="text-sm text-gray-600">
                          {program.classSize || "Limited spots"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={`/programs/${program.slug.current}`}
                    className={`block w-full text-center px-6 py-3 ${colors.color} text-white rounded-full hover:opacity-90 transition-all duration-300 font-medium text-sm `}>
                    View Program Details
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
