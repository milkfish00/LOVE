import React from "react";
import { aboutQuery } from "@/app/lib/queries";
import AboutPageClient from "./AboutPageClient";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export const metadata: Metadata = {
  title: "About U",
  description:
    "Learn about Love & Learning Child Care Center – our mission, team, and approach to early childhood education.",
};

export default async function AboutUsPage() {
  const { data } = await sanityFetch({
    query: aboutQuery,
    params: {},
  });

  return <AboutPageClient data={data} />;
}
