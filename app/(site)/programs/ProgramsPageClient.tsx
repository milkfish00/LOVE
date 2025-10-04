"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

// Define the interface for age group objects
interface AgeGroup {
  slug: any;
  id: string;
  title: string;
  ageRange: string;
  description: string;
  image: string;
  link: string;
  color: string;
  textColor: string;
  features: string[];
  ratio: string;
  schedule: string;
  curriculum: string[];
  dailyActivities: { time: string; activity: string; description: string }[];
  learningAreas: { icon: string; title: string; description: string }[];
  milestones: string[];
}

interface ProgramsPageClientProps {
  programs: AgeGroup[];
  programPageTitle?: string;
}

const ProgramsPageClient = ({
  programs,
  programPageTitle = "Our Programs",
}: ProgramsPageClientProps) => {
  const [activeAgeGroup, setActiveAgeGroup] = useState(programs[0]?.id || "");

  // Color mapping to match ProgramsSection
  const programColors: Record<string, { color: string; textColor: string }> = {
    infants: { color: "bg-[#E68978]", textColor: "text-white" },
    toddlers: { color: "bg-[#EB9D73]", textColor: "text-white" },
    twos: { color: "bg-[#F4BC5C]", textColor: "text-white" },
    threes: { color: "bg-[#859989]", textColor: "text-white" },
    "fours-and-fives": { color: "bg-[#445f80]", textColor: "text-white" },
    sixes: { color: "bg-[#A085A0]", textColor: "text-white" },
  };

  const getProgramColors = (id: string) => {
    return (
      programColors[id] || {
        color: "bg-gray-500",
        textColor: "text-white",
      }
    );
  };

  const currentProgram = programs.find((g) => g.id === activeAgeGroup);

  // Add a fallback if currentProgram is undefined
  if (!currentProgram) {
    return <div>Program not found</div>;
  }

  const currentColors = getProgramColors(currentProgram.id);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {programPageTitle}
          </h2>
          <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed ">
            Developmentally appropriate programs that nurture curiosity,
            creativity, and growth.
          </p>
        </div>
      </section>

      {/* Age Group Navigation */}
      <section className="py-6 bg-white top-0 z-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {programs.map((group) => {
              const colors = getProgramColors(group.id);
              const isActive = activeAgeGroup === group.id;
              return (
                <button
                  key={group.id}
                  onClick={() => setActiveAgeGroup(group.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    colors.color
                  } ${colors.textColor} ${
                    isActive
                      ? "shadow-lg scale-105"
                      : "opacity-80 hover:opacity-100 hover:scale-105"
                  }`}>
                  {group.title}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-14 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 order-2 lg:order-1">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center lg:text-left">
                  {currentProgram.title} Program
                </h2>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg text-center lg:text-left">
                  {currentProgram.description}
                </p>
              </div>

              <div className="flex justify-center lg:justify-start">
                <a
                  href={`/programs/${currentProgram.slug?.current}`}
                  className={`inline-flex items-center ${currentColors.color} ${currentColors.textColor} px-6 py-3 rounded-xl font-semibold transition-colors text-sm sm:text-base`}>
                  View program details
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative">
                <div
                  className={`w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 ${currentColors.color} rounded-3xl flex items-center justify-center`}>
                  <img
                    src={currentProgram.image}
                    alt={currentProgram.title}
                    className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain filter"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Programs */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Explore All Our Programs
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
              Each program is carefully crafted to meet the unique developmental
              needs of children at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const colors = getProgramColors(program.id);
              return (
                <a
                  key={program.id}
                  href={program.link}
                  className="bg-white rounded-2xl overflow-hidden  transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <div
                    className={`h-48 ${colors.color} flex items-center justify-center relative overflow-hidden`}>
                    <img
                      src={program.image}
                      alt={program.title}
                      className="h-36 object-contain filter transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {program.title} Program
                    </h3>
                    <div className="inline-flex items-center justify-center bg-gray-100 rounded-full px-4 py-2">
                      <span className="text-gray-700 text-sm font-medium">
                        {program.ageRange}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPageClient;
