import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import ConditionalLayout from "../components/ConditionalLayout";
import ClientPageLoader from "../components/ui/ClientPageLoader";
import SanityClientProviders from "../components/SanityClientProviders";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "../components/DisableDraftMode";
import { footerSettingsQuery } from "../lib/queries";
import { sanityClient } from "../lib/sanity";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Love and Learning Child Care Center",
  description: "Love and Learning Child Care Center",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch settings server-side for instant navbar/footer loading
  let settings = null;
  try {
    settings = await sanityClient.fetch(footerSettingsQuery);
  } catch (error) {
    console.error("Failed to load footer settings", error);
  }

  // draftMode is async in Next 15
  const dm = await draftMode();

  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <ConditionalLayout settings={settings}>

        {children}
        {dm.isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </ConditionalLayout>
      <SanityLive />
      {/* Only mount providers when draft mode is enabled; root layout renders the disable control */}
      {dm.isEnabled ? <SanityClientProviders /> : null}
    </div>
  );
}
