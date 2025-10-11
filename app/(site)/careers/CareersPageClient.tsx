"use client";
import React, { useState } from "react";
import { Briefcase, MapPin, Link as LinkIcon, Check } from "lucide-react";

export type CareersListJob = {
  key: string;
  title: string;
  location?: string;
  // Rich text blocks from Sanity (portable text)
  description?: any[]; 
  // Fallback plain text if already extracted server-side
  descriptionText?: string; 
  slug: string;
};

function portableTextToPlainText(blocks: any[] = []): string {
  try {
    return blocks
      .filter((b: any) => b?._type === "block" && Array.isArray(b.children))
      .map((b: any) => b.children.map((c: any) => c.text).join(""))
      .join("\n")
      .trim();
  } catch {
    return "";
  }
}

function truncateWords(text: string, maxWords = 24): string {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  return words.length <= maxWords ? text : words.slice(0, maxWords).join(" ") + "…";
}

export default function CareersPageClient({
  title,
  description,
  jobs,
}: {
  title?: string;
  description?: string;
  jobs: CareersListJob[];
}) {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const handleCopyLink = (slug: string) => {
    const jobUrl = `${window.location.origin}/careers/${slug}`;
    navigator.clipboard.writeText(jobUrl).then(() => {
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    });
  };

  return (
    <div className="min-h-screen">
      <section className="relative bg-[#86AF61] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {title || (
              <>
                Join Our <span className="text-[#FFD58B]">Team</span>
              </>
            )}
          </h1>
          {description ? (
            <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">{description}</p>
          ) : (
            <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
              Explore current openings and grow your career with us.
            </p>
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Open Positions</h2>

        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.key}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="bg-[#86AF61]/10 p-6 rounded-xl w-20 h-20 flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-[#86AF61]" />
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {job.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopyLink(job.slug)}
                      className="p-2 rounded-full text-gray-400 hover:text-[#86AF61] transition"
                      aria-label="Copy job link"
                    >
                      {copiedSlug === job.slug ? (
                        <Check className="w-5 h-5 text-[#86AF61]" />
                      ) : (
                        <LinkIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/*
                    Excerpt: prefer plain text passed in, else derive from portable text.
                    Limit to 24 words (adjust as needed).
                  */}
                  {(() => {
                    const fullText =
                      (job.descriptionText?.trim() || "") ||
                      portableTextToPlainText(job.description);
                    const excerpt = truncateWords(fullText, 24);
                    return excerpt ? (
                      <p className="text-gray-600 mb-4">{excerpt}</p>
                    ) : null;
                  })()}

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500"></span>
                    <a
                      href={`/careers/${job.slug}`}
                      className="bg-[#86AF61] hover:bg-[#769A51] text-white px-6 py-2 rounded-full font-medium transition-colors"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <Briefcase className="w-full h-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No jobs available</h3>
            <p className="text-gray-500 max-w-md mx-auto">Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}


