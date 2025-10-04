import React from "react";
import { allResourceSlugsQuery, resourceBySlugQuery } from "@/app/lib/queries";
import { Resources } from "@/app/lib/interface";
import { sanityClient } from "@/app/lib/sanity";
import { CheckSquare, BookOpen, HelpCircle } from "lucide-react";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";

export const revalidate = 60;

export async function generateStaticParams() {
  const data = (await sanityClient.fetch(allResourceSlugsQuery)) as Resources;
  const params = (data?.resources || [])
    .map((r) => r.slug?.current)
    .filter(Boolean)
    .map((slug) => ({ slug }));
  return params as { slug: string }[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: resourceBySlugQuery,
    params: { slug },
  });
  const resource = data?.resources;
  const title = resource?.title ? `${resource.title} – Resource` : "Resource";
  const description =
    resource?.description ||
    "Helpful resource from Love & Learning Child Care Center.";
  return { title, description };
}

function fileUrlFromRef(ref?: string): string | undefined {
  if (!ref) return undefined;
  const [, assetId, ext] = ref.split("-");
  if (!assetId || !ext) return undefined;
  const projectId = "6jqzfkhy";
  const dataset = "production";
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${ext}`;
}

const ResourceDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: resourceBySlugQuery,
    params: { slug },
  });
  const resource = data?.resources;

  if (!resource) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Resource Not Found
        </h1>
        <p className="text-gray-600">
          The resource you are looking for does not exist.
        </p>
      </div>
    );
  }

  if (resource.type === "checklist") {
    return (
      <div className="min-h-screen bg-white">
        <section className="bg-[#F5856F]">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {resource.title}
            </h1>
            {resource.description && (
              <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
                {resource.description}
              </p>
            )}
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-6">
            <div className="bg-white rounded-xl">
              <div className="flex items-center mb-10">
                <div className="w-12 h-12 bg-[#F5856F]/10 rounded-xl flex items-center justify-center mr-4">
                  <CheckSquare className="w-6 h-6 text-[#F5856F]" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Checklist
                </h2>
              </div>
              <div className="space-y-4 mb-12">
                {Array.isArray(resource.checklistItems) &&
                resource.checklistItems.length > 0 ? (
                  resource.checklistItems.map((item: any) => (
                    <div
                      key={item._key}
                      className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="w-6 h-6 border-2 border-[#F5856F] rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#F5856F] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div>
                        <div className="text-gray-900 font-medium">
                          {item.item}
                        </div>
                        {item.details && (
                          <div className="text-gray-600 text-sm mt-1">
                            {item.details}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-600">
                    No checklist items available.
                  </div>
                )}
              </div>
              <div className="bg-[#F5856F] rounded-2xl p-8 text-white">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="font-bold text-xl mb-3">Need Help?</h4>
                    <p className="text-white/90 text-sm mb-6">
                      Have questions about this checklist? Reach out and we'll
                      assist you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      {resource.downloadPdf?.asset?._ref && (
                        <a
                          href={fileUrlFromRef(resource.downloadPdf.asset._ref)}
                          className="inline-flex items-center justify-center gap-2 bg-white text-[#892e1c] px-5 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                          target="_blank"
                          rel="noreferrer"
                          download>
                          Download PDF
                        </a>
                      )}
                      <a
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 bg-transparent border border-white text-white px-5 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer">
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (resource.type === "guide") {
    return (
      <div className="min-h-screen">
        <section className="bg-gradient-to-br from-[#81AA8E] to-[#6A9478]">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {resource.title}
            </h1>
            {resource.description && (
              <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                {resource.description}
              </p>
            )}
          </div>
        </section>
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-2xl">
              <div className="flex items-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">Guide</h2>
              </div>
              <div className="prose max-w-none">
                {Array.isArray(resource.content) &&
                resource.content.length > 0 ? (
                  resource.content.map((block: any) => (
                    <p key={block._key}>
                      {Array.isArray(block.children)
                        ? block.children.map((c: any) => c.text || "").join(" ")
                        : ""}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-700">No content available.</p>
                )}
              </div>
              {resource.downloadPdf?.asset?._ref && (
                <div className="mt-8">
                  <a
                    className="inline-block px-6 py-3 rounded-full bg-[#6A9478] text-white"
                    href={fileUrlFromRef(resource.downloadPdf.asset._ref)}
                    target="_blank"
                    rel="noreferrer"
                    download>
                    Download PDF
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {resource.title}
          </h1>
          {resource.description && (
            <p className="text-lg text-gray-700 mb-8">{resource.description}</p>
          )}
          {resource.downloadPdf?.asset?._ref ? (
            <a
              className="inline-block mt-6 px-6 py-3 rounded-full bg-gray-900 text-white"
              href={fileUrlFromRef(resource.downloadPdf.asset._ref)}
              target="_blank"
              rel="noreferrer">
              Download File
            </a>
          ) : (
            <div className="text-gray-600">No file available for download.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ResourceDetailPage;
