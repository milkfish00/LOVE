// app/careers/page.tsx
import React from "react";
import { careersQuery } from "@/app/lib/queries";
import { Careers } from "@/app/lib/interface";
import { extractTextFromRichText } from "@/app/lib/program-utils";
import { slugify } from "@/app/lib/slug";
import CareersPageClient, { CareersListJob } from "./CareersPageClient";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore open positions at Love & Learning Child Care Center and join our caring team.",
};

const JobsPage = async () => {
  try {
    // ✅ Use only sanityFetch for visual editor to work
        const { data } = (await sanityFetch({
          query: careersQuery,
          params: {},
        })) as { data: Careers };
    
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
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        Failed to load careers.
      </div>
    );
  }
};

export default JobsPage;
