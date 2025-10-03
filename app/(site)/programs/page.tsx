import React from "react";
import { programsQuery } from "@/app/lib/queries";
import { Programs } from "@/app/lib/interface";
import { sanityClient, urlFor } from "@/app/lib/sanity";
import { getProgramColors, extractTextFromRichText } from "@/app/lib/program-utils";
import ProgramsPageClient from "@/app/(site)/programs/ProgramsPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore our programs from infants through pre-K. Discover schedules, class sizes, and learning focuses.",
};

const ProgramsPage = async () => {
  try {
    // Fetch programs data from Sanity
    console.log('Fetching programs data...');
    const data: Programs = await sanityClient.fetch(programsQuery);
    console.log('Programs data:', data);
    
    if (!data?.programSections) {
      console.log('No program sections found');
      return <div>No programs found</div>;
    }

  // Transform Sanity data to match the expected format
  const transformedPrograms = data.programSections.map((program) => {
    const colors = getProgramColors(program.slug.current);
    return {
      id: program.slug.current,
      slug: program.slug,
      title: program.programTitle,
      ageRange: program.ageRange,
      description: extractTextFromRichText(program.description) || "Program description not available",
      image: program.image?.asset?._ref ? urlFor(program.image).url() : `/${program.slug.current}.svg`,
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
        const titles = ["Cognitive Development", "Social Skills", "Creative Expression", "Physical Development"];
        return {
          icon: iconNames[index] || "BookOpen",
          title: titles[index],
          description: "Age-appropriate activities designed to foster growth and learning in this essential area.",
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
  } catch (error) {
    console.error('Error fetching programs data:', error);
    return <div>Error loading programs. Please try again later.</div>;
  }
};

export default ProgramsPage;
