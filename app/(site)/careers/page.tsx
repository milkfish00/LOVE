import React from "react";
import { sanityClient } from "@/app/lib/sanity";
import { careersQuery } from "@/app/lib/queries";
import { Careers } from "@/app/lib/interface";
import { extractTextFromRichText } from "@/app/lib/program-utils";
import { slugify } from "@/app/lib/slug";
import CareersPageClient, { CareersListJob } from "./CareersPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore open positions at Love & Learning Child Care Center and join our caring team.",
};

const JobsPage = async () => {
  try {
    const data: Careers = await sanityClient.fetch(careersQuery);

    const jobs: CareersListJob[] = (data?.jobs || []).map((job) => ({
      key: job._key,
      title: job.title,
      location: job.location,
      descriptionText: extractTextFromRichText(job.description as any[]),
      slug: slugify(job.title || job._key),
    }));

    return (
      <CareersPageClient
        title={data?.title}
        description={data?.description}
        jobs={jobs}
      />
    );
  } catch (error) {
    console.error("Error loading careers:", error);
    return <div className="max-w-5xl mx-auto px-4 py-12">Failed to load careers.</div>;
  }
};

export default JobsPage;
