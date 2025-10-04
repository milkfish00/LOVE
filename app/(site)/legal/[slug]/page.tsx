// app/legal/[slug]/page.tsx

import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/live";

export const revalidate = 60; // Revalidate every 60 seconds


// Query to get legal document by slug
const legalDocumentQuery = `
  *[_type == "settings"][0] {
    legalDocuments[slug.current == $slug][0] {
      _key,
      _type,
      title,
      slug {
        _type,
        current
      },
      content[] {
        _key,
        _type,
        children[] {
          _key,
          _type,
          marks,
          text
        },
        level,
        listItem,
        markDefs[] {
          _key,
          _type,
          href
        },
        style
      }
    }
  }
`;

// Query to get all legal document slugs for static generation
const allLegalSlugsQuery = `
  *[_type == "settings"][0] {
    legalDocuments[] {
      slug {
        current
      }
    }
  }
`;

interface LegalDocument {
  _key: string;
  _type: string;
  title: string;
  slug: {
    _type: string;
    current: string;
  };
  content: any[];
}

// Generate static params for all legal documents
export async function generateStaticParams() {
  
  const data = await client.fetch(allLegalSlugsQuery);

  if (!data?.legalDocuments) {
    return [];
  }

  return data.legalDocuments.map((doc: any) => ({
    slug: doc.slug.current,
  }));
}

// Custom components for PortableText rendering
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-4 text-gray-700">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-gray-700">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="text-gray-700">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline">
        {children}
      </a>
    ),
  },
};

export default async function LegalDocumentPage({
  params,
}: {
  params: { slug: string };
}) {
  
  const { data } = await sanityFetch({
    query: legalDocumentQuery,
    params: { slug: params.slug },
  });

  const document: LegalDocument | null = data?.legalDocuments;

  if (!document) {
    notFound();
  }

  return (
    <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="mx-auto max-w-7xl px-8">
        {/* Legal Document Content - Centered */}
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-12 text-center">
            {document.title}
          </h1>

          <div className="prose prose-lg max-w-none text-left">
            <PortableText
              value={document.content}
              components={portableTextComponents}
            />
          </div>

          <div className="mt-12 text-sm text-gray-500 text-center border-t border-gray-200 pt-8">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Add metadata generation
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await client.fetch(legalDocumentQuery, {
    slug: params.slug,
  });

  const document: LegalDocument | null = data?.legalDocuments;

  if (!document) {
    return {
      title: "Document Not Found",
    };
  }

  return {
    title: `${document.title} | Love & Learning Child Care Center`,
    description: `Read our ${document.title} to learn about our policies and procedures.`,
  };
}
