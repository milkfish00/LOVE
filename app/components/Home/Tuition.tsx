"use client";
import React from "react";
import { Programs } from "@/app/lib/interface";

interface TuitionRatesSectionProps {
  data: Programs;
}

export default function TuitionRatesSection({
  data,
}: TuitionRatesSectionProps) {
  const programColors: Record<string, { color: string; gradient: string }> = {
    infants: {
      color: "bg-[#E68978]",
      gradient: "from-[#E68978] to-[#d67766]",
    },
    toddlers: {
      color: "bg-[#EB9D73]",
      gradient: "from-[#EB9D73] to-[#d98b61]",
    },
    twos: {
      color: "bg-[#F4BC5C]",
      gradient: "from-[#F4BC5C] to-[#e2aa4a]",
    },
    threes: {
      color: "bg-[#859989]",
      gradient: "from-[#859989] to-[#738777]",
    },
    "fours-and-fives": {
      color: "bg-[#445f80]",
      gradient: "from-[#445f80] to-[#354d6e]",
    },
    sixes: {
      color: "bg-[#A085A0]",
      gradient: "from-[#A085A0] to-[#8e738e]",
    },
  };

  const getProgramColors = (slug: string) => {
    return (
      programColors[slug] || {
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
          {data.programSections.map((program) => {
            const colors = getProgramColors(program.slug.current);

            return (
              <div
                key={program._key}
                className="bg-white rounded-2xl  transition-all duration-300 overflow-hidden group">
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
