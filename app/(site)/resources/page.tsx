import React from "react";
import { resourcesQuery } from "@/app/lib/queries";
import { Resources } from "@/app/lib/interface";
import { sanityClient, urlFor } from "@/app/lib/sanity";
import ResourcesPageClient from "./ResourcesPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Helpful guides, checklists, and forms for families and staff at Love & Learning Child Care Center.",
};

// Build Sanity file URL from file asset ref
function fileUrlFromRef(ref?: string): string | undefined {
  if (!ref) return undefined;
  // Sanity file refs look like: file-<assetId>-<extension>
  // Example: file-123abc-xyz.pdf
  const [, assetId, ext] = ref.split("-");
  if (!assetId || !ext) return undefined;
  const projectId = "6jqzfkhy";
  const dataset = "production";
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${ext}`;
}

const ResourcesPage = async () => {
  const data = (await sanityClient.fetch(resourcesQuery)) as Resources | null;

  const hero = data?.resourcesHero?.[0]
    ? {
        title: data.resourcesHero[0].title,
        description: data.resourcesHero[0].description,
        backgroundImageUrl: data.resourcesHero[0].backgroundImage?.asset?._ref
          ? urlFor(data.resourcesHero[0].backgroundImage).url()
          : undefined,
      }
    : undefined;

  // Fixed tabs for simpler navigation
  const tabs = ["Parents", "Staff"];

  const colorPaletteMap: Record<string, { color: string; bgColor: string }> = {
    "sage-green": { color: "bg-[#86AF61]", bgColor: "bg-[#86AF61]/10" },
    "mint-green": { color: "bg-[#7FB3B8]", bgColor: "bg-[#7FB3B8]/10" },
    "warm-coral": { color: "bg-[#E68978]", bgColor: "bg-[#E68978]/10" },
    "coral-pink": { color: "bg-[#EB9D73]", bgColor: "bg-[#EB9D73]/10" },
    "golden-yellow": { color: "bg-[#E3AC4A]", bgColor: "bg-[#E3AC4A]/10" },
    "deep-purple": { color: "bg-[#80739C]", bgColor: "bg-[#80739C]/10" },
  };

  // Override colors by resource type where desired
  const typeColorOverrides: Record<string, { color: string; bgColor: string }> = {
    // Match individual pages: checklist uses orange (#F5856F)
    checklist: { color: "bg-[#F5856F]", bgColor: "bg-[#F5856F]/10" },
    // Guides use green gradient on detail; use solid #6A9478 here
    guide: { color: "bg-[#6A9478]", bgColor: "bg-[#6A9478]/10" },
  };

  const resources = (data?.resources || []).map((r) => {
    const defaultPalette = { color: "bg-[#E3AC4A]", bgColor: "bg-[#E3AC4A]/10" };
    const paletteFromField = r.colorPalette
      ? colorPaletteMap[r.colorPalette] || defaultPalette
      : defaultPalette;
    const palette = typeColorOverrides[r.type] || paletteFromField;
    const downloadHref = r.downloadPdf?.asset?._ref
      ? fileUrlFromRef(r.downloadPdf.asset._ref)
      : undefined;
    const iconByType: Record<string, string> = {
      guide: "BookOpen",
      checklist: "CheckSquare",
      file: "FileText",
    };
    const iconName = iconByType[r.type] || "FileText";
    return {
      id: r.slug?.current || r._key,
      title: r.title,
      description: (r.description || (
        Array.isArray(r.content) && r.content.length > 0
          ? r.content
              .map((block: any) => (Array.isArray(block.children) ? block.children.map((c: any) => c.text || "").join("") : ""))
              .join(" ")
          : ""
      )),
      category: undefined,
      tags: r.tags,
      type: r.type,
      iconName,
      color: palette.color,
      bgColor: palette.bgColor,
      detailHref: r.type === "file" ? undefined : (r.slug?.current ? `/resources/${r.slug.current}` : undefined),
      downloadHref,
    };
  });

  return <ResourcesPageClient hero={hero} resources={resources} tabs={tabs} />;
};

export default ResourcesPage;
