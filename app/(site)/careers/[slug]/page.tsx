import React from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import { sanityClient } from "@/app/lib/sanity";
import { careersQuery } from "@/app/lib/queries";
import { Careers } from "@/app/lib/interface";
import { extractTextFromRichText } from "@/app/lib/program-utils";
import { slugify } from "@/app/lib/slug";
import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data: Careers = await sanityClient.fetch(careersQuery);
  const jobs = (data?.jobs || []).map((job) => ({
    title: job.title,
    descriptionText: extractTextFromRichText(job.description as any[]),
    slug: slugify(job.title || job._key),
  }));
  const job = jobs.find((j) => j.slug === slug);
  const title = job ? `${job.title} – Careers` : "Careers";
  const description =
    job?.descriptionText ||
    data?.description ||
    "View our open positions at Love & Learning.";
  return { title, description };
}

const portableTextComponents: PortableTextComponents = {
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 space-y-2 my-4 marker:text-gray-900">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 space-y-2 my-4 marker:text-gray-900">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-gray-700 leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-gray-700 leading-relaxed">{children}</li>
    ),
  },
  block: {
    normal: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-900">
        {children}
      </h4>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-[#86AF61] hover:underline"
        target="_blank"
        rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

const JobDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const data: Careers = await sanityClient.fetch(careersQuery);
  const jobs = (data?.jobs || []).map((job) => ({
    key: job._key,
    title: job.title,
    location: job.location,
    description: job.description as any[],
    slug: slugify(job.title || job._key),
  }));
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#86AF61] mb-6 transition-colors">
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
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#86AF61] mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </Link>

        <div className="bg-white p-8 rounded-2xl shadow mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Job Description
            </h2>
            {job.description && (
              <div className="text-base">
                <PortableText
                  value={job.description as any[]}
                  components={portableTextComponents}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
