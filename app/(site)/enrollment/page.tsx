import React from "react";
import { Tuition, Programs } from "@/app/lib/interface";
import { tuitionQuery, programsQuery } from "@/app/lib/queries";
import { sanityClient } from "@/app/lib/sanity";
import EnrollmentPageClient from "./EnrollmentPageClient";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Tuition & Enrollment",
  description:
    "Learn about our enrollment process and tuition options at Love & Learning Child Care Center.",
};

const EnrollmentPage = async () => {
  const { data: tuitionData } = await sanityFetch({
    query: tuitionQuery,
    params: {},
  });

  const { data: programsData } = await sanityFetch({
    query: programsQuery,
    params: {},
  });

  if (!tuitionData) {
    return <div className="max-w-4xl mx-auto px-6 py-16">No enrollment data found.</div>;
  }

  return <EnrollmentPageClient data={tuitionData} programsData={programsData} />;
};

export default EnrollmentPage;