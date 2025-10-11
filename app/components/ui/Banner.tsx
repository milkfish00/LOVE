"use client";

import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { sanityClient } from "../../lib/sanity";
import { settingsQuery } from "../../lib/queries";
import { Settings } from "../../lib/interface";



export default function Banner() {
  const [open, setOpen] = useState(true);
  const [settings, setSettings] = useState<Settings | null>(null);

  // ✅ Fetch settings in useEffect
  useEffect(() => {
    async function fetchSettings() {
      try {
        const settingsData: Settings = await sanityClient.fetch(
          settingsQuery,
          {},
          { next: { revalidate: 60 } }
        );
        setSettings(settingsData);
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    }

    fetchSettings();
  }, []);

  if (!open || !settings) return null;

  const banner = settings.banner?.[0];
  if (!banner) return null;

  return (
    <div
      role="region"
      aria-label="Site announcement"
      className="relative isolate bg-[#626690] px-4 py-3 text-white sm:px-6 sm:py-2.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-relaxed sm:leading-snug">
            <strong className="font-semibold block sm:inline">
              {banner.text || "Now Enrolling 2025/2026"}
            </strong>
            {banner.subtitle && (
              <>
                <span className="hidden sm:inline mx-2 opacity-70">•</span>
                <span className="block sm:inline text-white/90 mt-0.5 sm:mt-0">
                  {banner.subtitle}
                </span>
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {banner.link && banner.buttonText && (
            <a
              href={banner.link}
              target="_blank"
              className="inline-flex items-center justify-center text-sm font-semibold whitespace-nowrap underline-offset-6 underline">
              {banner.buttonText} →
            </a>
          )}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Dismiss announcement"
            className="shrink-0 rounded-full p-1.5 text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors">
            <XMarkIcon aria-hidden="true" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
