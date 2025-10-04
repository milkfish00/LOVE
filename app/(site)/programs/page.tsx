import React from "react";
import { programsQuery } from "@/app/lib/queries";
import { Programs } from "@/app/lib/interface";
import { urlFor } from "@/app/lib/sanity";
import {
  getProgramColors,
  extractTextFromRichText,
} from "@/app/lib/program-utils";
import ProgramsPageClient from "@/app/(site)/programs/ProgramsPageClient";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore our programs from infants through pre-K. Discover schedules, class sizes, and learning focuses.",
};

const ProgramsPage = async () => {
  const { data } = await sanityFetch({
    query: programsQuery,
    params: {},
  });

  if (!data?.programSections) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">No programs found</p>
      </div>
    );
  }

  // Transform Sanity data to match the expected format
  const transformedPrograms = data.programSections.map((program: { slug: { current: string; }; programTitle: any; ageRange: any; description: any[]; image: { asset: { _ref: any; }; }; classSize: any; schedule: any; dailyActivities: any; }) => {
    const colors = getProgramColors(program.slug.current);
    return {
      id: program.slug.current,
      slug: program.slug,
      title: program.programTitle,
      ageRange: program.ageRange,
      description:
        extractTextFromRichText(program.description) ||
        "Program description not available",
      image: program.image?.asset?._ref
        ? urlFor(program.image).url()
        : `/${program.slug.current}.svg`,
      color: colors.color,
      textColor: colors.textColor,
      link: `/programs/${program.slug.current}`,
      features: [
        "Safe and nurturing environment",
        "Age-appropriate curriculum",
        "Experienced Staff",
        "Regular communication with families",
      ],
      ratio: program.classSize,
      schedule: program.schedule,
      curriculum: [
        "Cognitive development activities",
        "Social and emotional learning",
        "Physical development",
        "Creative expression",
        "Language and literacy",
      ],
      dailyActivities: program.dailyActivities || [],
      learningAreas: Array.from({ length: 4 }, (_, index) => {
        const iconNames = ["BookOpen", "Target", "Star", "Users"];
        const titles = [
          "Cognitive Development",
          "Social Skills",
          "Creative Expression",
          "Physical Development",
        ];
        return {
          icon: iconNames[index] || "BookOpen",
          title: titles[index],
          description:
            "Age-appropriate activities designed to foster growth and learning in this essential area.",
        };
      }),
      milestones: [
        "Develop independence and self-confidence",
        "Build social and emotional skills",
        "Foster creativity and self-expression",
        "Support physical development",
        "Prepare for next developmental stage",
      ],
    };
  });

  return <ProgramsPageClient programs={transformedPrograms} />;
};

export default ProgramsPage;
