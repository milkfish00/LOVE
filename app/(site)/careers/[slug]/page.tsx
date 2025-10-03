import React from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { sanityClient } from "@/app/lib/sanity";
import { careersQuery } from "@/app/lib/queries";
import { Careers } from "@/app/lib/interface";
import { extractTextFromRichText } from "@/app/lib/program-utils";
import { slugify } from "@/app/lib/slug";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const data: Careers = await sanityClient.fetch(careersQuery);
  const jobs = (data?.jobs || []).map((job) => ({
    title: job.title,
    descriptionText: extractTextFromRichText(job.description as any[]),
    slug: slugify(job.title || job._key),
  }));
  const job = jobs.find((j) => j.slug === slug);
  const title = job ? `${job.title} – Careers` : "Careers";
  const description = job?.descriptionText || data?.description || "View our open positions at Love & Learning.";
  return {
    title,
    description,
  };
}

const JobDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const data: Careers = await sanityClient.fetch(careersQuery);
  const jobs = (data?.jobs || []).map((job) => ({
    key: job._key,
    title: job.title,
    location: job.location,
    descriptionText: extractTextFromRichText(job.description as any[]),
    slug: slugify(job.title || job._key),
  }));

  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#86AF61] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Jobs
          </Link>
          <div className="bg-white p-8 rounded-2xl shadow">Job not found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#86AF61] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </Link>

        <div className="bg-white p-8 rounded-2xl shadow mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
            {job.location && (
              <span className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full text-sm">
                <MapPin className="w-4 h-4" /> {job.location}
              </span>
            )}
          </div>

          <div className="border-t pt-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
            {job.descriptionText && (
              <p className="text-gray-700 mb-6">{job.descriptionText}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
