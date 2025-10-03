import React from "react";
import { aboutQuery } from "@/app/lib/queries";
import { About } from "@/app/lib/interface";
import { sanityClient } from "@/app/lib/sanity";
import AboutPageClient from "./AboutPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Love & Learning Child Care Center — our mission, team, and approach to early childhood education.",
};

export default async function AboutUsPage() {
  const query = aboutQuery;
  const data: About = await sanityClient.fetch(query);
  return <AboutPageClient data={data} />;
}
