import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SanityClientProviders from "../components/SanityClientProviders";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "../components/DisableDraftMode";
import { settingsQuery } from "../lib/queries";
import { sanityClient } from "../lib/sanity";
import { urlFor } from "@/sanity/lib/image";
import { Settings } from "../lib/interface";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import Banner from "../components/ui/Banner";

const revalidate = 60;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export async function generateMetadata(): Promise<Metadata> {
  let settings: Settings | null = null;

  try {
    settings = await sanityClient.fetch(settingsQuery);
  } catch (error) {
    console.error("Failed to load settings for metadata", error);
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.loveandlearning.net";
  const title = settings?.title || "Love & Learning Child Care Center";
  const description =
    settings?.description ||
    "Welcome to Love & Learning Child Care Center. A safe, loving environment for early learning in Fletcher, NC.";

  const ogImage = settings?.openGraphImage
    ? urlFor(settings.openGraphImage).width(1200).height(630).quality(90).url()
    : `${siteUrl}/og-image.jpg`;

  const faviconUrl = settings?.favicon?.asset?._ref
    ? `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "6jqzfkhy"}/${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}/${settings.favicon.asset._ref.replace("file-", "").replace("-ico", ".ico")}`
    : "/favicon.ico";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords: settings?.seoKeywords || [
      "child care",
      "daycare",
      "preschool",
      "Fletcher NC",
      "early learning",
      "childcare center",
    ],
    authors: [{ name: "Love & Learning Child Care Center" }],
    creator: "Love & Learning Child Care Center",
    publisher: "Love & Learning Child Care Center",

    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: title,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@loveandlearning",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    verification: {},

    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },

    manifest: "/site.webmanifest",

    alternates: {
      canonical: siteUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings: Settings | null = null;
  try {
    settings = await sanityClient.fetch(settingsQuery);
  } catch (error) {
    console.error("Failed to load footer settings", error);
  }

  const dm = await draftMode();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://6jqzfkhy.apicdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://6jqzfkhy.apicdn.sanity.io" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ChildCare",
              name: "Love & Learning Child Care Center",
              description:
                settings?.description ||
                "A safe, loving environment for early learning in Fletcher, NC. ",
              url: "https://www.loveandlearning.net",
              logo: settings?.navLogo
                ? urlFor(settings.navLogo).url()
                : undefined,
              image: settings?.openGraphImage
                ? urlFor(settings.openGraphImage).url()
                : undefined,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Your Street Address",
                addressLocality: "Fletcher",
                addressRegion: "NC",
                postalCode: "Your Postal Code",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "Your Phone Number",
                contactType: "customer service",
              },
              sameAs: settings?.socialLinks?.map((link) => link.url) || [],
              priceRange: "$$",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "07:00",
                  closes: "18:00",
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Banner />
          <Navbar settings={settings as any} />
          
          {children}
          <Footer settings={settings as any} />
          {dm.isEnabled && (
            <>
              <VisualEditing />
              <DisableDraftMode />
            </>
          )}
        <SanityLive />

        {dm.isEnabled ? <SanityClientProviders /> : null}
      </body>
    </html>
  );
}
