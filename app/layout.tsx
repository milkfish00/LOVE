import type { Metadata } from "next";
import "./globals.css";
import { openSans } from "@/app/fonts";
import { sanityClient } from "@/app/lib/sanity";
import { settingsQuery } from "@/app/lib/queries";
import { urlFor } from "@/app/lib/sanity";



export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await sanityClient.fetch(settingsQuery);
    const title: string | undefined = settings?.title;
    const description: string | undefined = settings?.description;
    const keywords: string[] | undefined = settings?.seoKeywords;
    const ogImageUrl = settings?.openGraphImage?.asset
      ? urlFor(settings.openGraphImage).width(1200).height(630).url()
      : undefined;
    const iconUrl = settings?.favicon?.asset ? urlFor(settings.favicon).width(64).height(64).url() : undefined;

    const defaultTitle = "Love & Learning Child Care Center";
    const defaultDescription =
      "A licensed childcare center in Fletcher, NC, offering infant-to-preschool programs with small groups and a strong focus on nature-based learning";
    const defaultKeywords = [
      "child care",
      "daycare",
      "preschool",
      "Charlotte NC",
      "early childhood education",
      "enrollment",
    ];

    const resolvedTitle = title || defaultTitle;
    const resolvedDescription = description || defaultDescription;
    const resolvedKeywords = keywords || defaultKeywords;
    const resolvedOgImages = ogImageUrl
      ? [{ url: ogImageUrl, width: 1200, height: 630, alt: title || "Open Graph Image" }]
      : [{ url: "/hero.jpeg", width: 1200, height: 630, alt: "Love & Learning" }];

    return {
      metadataBase: new URL("https://www.loveandlearningchildcare.com"),
      title: { default: resolvedTitle, template: `%s | ${resolvedTitle}` },
      description: resolvedDescription,
      keywords: resolvedKeywords,
      openGraph: {
        type: "website",
        title: resolvedTitle,
        description: resolvedDescription,
        images: resolvedOgImages,
      },
      twitter: {
        card: "summary_large_image",
        title: resolvedTitle,
        description: resolvedDescription,
        images: [ogImageUrl || "/hero.jpeg"],
      },
      robots: {
        index: true,
        follow: true,
      },
      icons: iconUrl ? { icon: iconUrl } : { icon: "/favicon.ico" },
    };
  } catch (e) {
    return {
      metadataBase: new URL("https://www.loveandlearningchildcare.com"),
      title: {
        default: "Love & Learning Child Care Center",
        template: "Love & Learning Child Care Center",
      },
      description:
        "Nature-based child care in Fletcher, NC. Love and Learning serves infants through pre-K with outdoor-focused learning. ",
      keywords: [
        "child care",
        "daycare",
        "preschool",
        "Charlotte NC",
        "early childhood education",
        "enrollment",
      ],
      openGraph: {
        type: "website",
        title: "Love & Learning Child Care Center",
        description:
          "Nature-based child care in Fletcher, NC. Love and Learning serves infants through pre-K with outdoor-focused learning. ",
        images: [
          {
            url: "/hero.jpeg",
            width: 1200,
            height: 630,
            alt: "Love & Learning",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Love & Learning Child Care Center",
        description:
          "Nature-based child care in Fletcher, NC. Love and Learning serves infants through pre-K with outdoor-focused learning. ",
        images: ["/hero.jpeg"],
      },
      robots: {
        index: true,
        follow: true,
      },
      icons: { icon: "/favicon.ico" },
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
      </head>
      <body className={openSans.className}>
        {children}
     
      </body>
    </html>
  );
}
