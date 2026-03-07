import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
    <>
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
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Banner />
        <Navbar settings={settings as any} />

        {children}
        <Footer settings={settings as any} />
        <div className="calendly-badge-widget calendly-badge-hidden">
          <a
            id="calendly-floating-trigger"
            href="https://calendly.com/loveandlearning-info/30min"
            className="calendly-badge-content calendly-badge-professional"
            aria-label="Book a tour">
            <img
              src="/svg/boy.svg"
              alt=""
              aria-hidden="true"
              className="calendly-badge-icon"
            />
            <span className="calendly-badge-label">Book a Tour!</span>
          </a>
        </div>
        <Script id="calendly-badge-init" strategy="afterInteractive">
          {`(function initCalendlyBadge() {
  if (window.__loveCalendlyFloatingInit) {
    return;
  }
  window.__loveCalendlyFloatingInit = true;

  var MAX_ATTEMPTS = 60;
  var attempts = 0;
  var activeObserver = null;
  var activeFallbackCheck = null;
  var currentPathname = null;

  function getPathname() {
    try {
      return window.location.pathname || '/';
    } catch (_error) {
      return '/';
    }
  }

  function isHomePath(pathname) {
    return pathname === '/';
  }

  function cleanupVisibilityBindings() {
    if (activeObserver) {
      activeObserver.disconnect();
      activeObserver = null;
    }

    if (activeFallbackCheck) {
      window.removeEventListener('scroll', activeFallbackCheck);
      activeFallbackCheck = null;
    }
  }

  function setBadgeVisible(visible) {
    var widget = document.querySelector('.calendly-badge-widget');
    if (!widget) {
      return;
    }

    widget.classList.toggle('calendly-badge-hidden', !visible);
    widget.classList.toggle('calendly-badge-visible', visible);
  }

  function bindHomeVisibilityTrigger() {
    var aboutHeading = document.getElementById('about-heading');

    if (!aboutHeading) {
      setBadgeVisible(false);
      return;
    }

    setBadgeVisible(false);

    if (!('IntersectionObserver' in window)) {
      activeFallbackCheck = function () {
        var rect = aboutHeading.getBoundingClientRect();
        var hasReachedAbout = rect.top <= window.innerHeight * 0.8;
        setBadgeVisible(hasReachedAbout);
      };

      activeFallbackCheck();
      window.addEventListener('scroll', activeFallbackCheck, { passive: true });
      return;
    }

    activeObserver = new IntersectionObserver(
      function (entries) {
        var entry = entries[0];
        if (!entry) {
          return;
        }

        var hasReachedAbout = entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight * 0.8;
        setBadgeVisible(hasReachedAbout);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px -20% 0px'
      }
    );

    activeObserver.observe(aboutHeading);
  }

  function refreshVisibilityBindings() {
    var pathname = getPathname();
    cleanupVisibilityBindings();

    if (isHomePath(pathname)) {
      bindHomeVisibilityTrigger();
    } else {
      setBadgeVisible(true);
    }
  }

  function mountBadge() {
    if (!document.querySelector('.calendly-badge-widget')) {
      attempts += 1;
      if (attempts < MAX_ATTEMPTS) {
        window.setTimeout(mountBadge, 200);
      }
      return;
    }

    currentPathname = getPathname();
    refreshVisibilityBindings();

    window.setInterval(function () {
      var nextPathname = getPathname();
      if (nextPathname !== currentPathname) {
        currentPathname = nextPathname;
        refreshVisibilityBindings();
      }
    }, 250);

    var domObserver = new MutationObserver(function () {
      if (!isHomePath(getPathname())) {
        return;
      }

      if (!document.getElementById('about-heading')) {
        return;
      }

      cleanupVisibilityBindings();
      bindHomeVisibilityTrigger();
    });

    domObserver.observe(document.body, { childList: true, subtree: true });
  }

  mountBadge();
})();`}
        </Script>
        {dm.isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
        <SanityLive />

        {dm.isEnabled ? <SanityClientProviders /> : null}
      </div>
    </>
  );
}
