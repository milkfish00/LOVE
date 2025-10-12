import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { FooterSettings } from "../../lib/interface";

interface FooterProps {
  settings: FooterSettings;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  const getIcon = (platform: string) => {
    const key = platform.toLowerCase();
    if (key.includes("facebook")) return Facebook;
    if (key.includes("instagram")) return Instagram;
    if (key.includes("linkedin")) return Linkedin;
    if (key.includes("twitter") || key.includes("x")) return Twitter;
    return null;
  };

  return (
    <footer className="bg-[#4c4164] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Link href="/home" className="flex items-center mb-3">
                {settings?.footerLogo && (
                  <img
                    src={urlFor(settings.footerLogo).url()}
                    alt="Love & Learning Child Care Center"
                    className="w-60 h-auto"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </Link>
            </div>
            {settings?.description && (
              <p className="text-white/80 text-sm leading-relaxed max-w-xs open-reg mb-6">
                {settings.description}
              </p>
            )}

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {settings?.socialLinks && settings.socialLinks.length > 0
                ? settings.socialLinks
                    .map((s) => ({ ...s, Icon: getIcon(s.platform) }))
                    .filter((s) => s.Icon && s.url)
                    .map(({ platform, url, Icon }) => (
                      <Link
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-white transition-colors duration-200">
                        {Icon && <Icon className="w-5 h-5" />}
                      </Link>
                    ))
                : null}
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">COMPANY</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about#staff"
                  className="text-white/80 hover:text-white text-sm">
                  Meet Our Staff
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-white/80 hover:text-white text-sm">
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-white/80 hover:text-white text-sm">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">PROGRAMS</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/programs/infants"
                  className="text-white/80 hover:text-white text-sm">
                  Infants
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/toddlers"
                  className="text-white/80 hover:text-white text-sm">
                  Toddlers
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/twos"
                  className="text-white/80 hover:text-white text-sm">
                  Two's
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/threes"
                  className="text-white/80 hover:text-white text-sm">
                  Three's
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/fours-and-fives"
                  className="text-white/80 hover:text-white text-sm">
                  Four's & Five's
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-6">RESOURCES</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/enrollment"
                  className="text-white/80 hover:text-white text-sm">
                  Enrollment & Tuition
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/first-day-checklist"
                  className="text-white/80 hover:text-white text-sm">
                  First Day Checklist
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/staff-file-checklist"
                  className="text-white/80 hover:text-white text-sm">
                  Staff Checklist
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/gallery"
                  className="text-white/80 hover:text-white text-sm">
                  Our Facility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-white/80 text-sm">
              ©{new Date().getFullYear()} Love & Learning Child Care Center
            </div>

            {/* Legal Documents Links */}
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-4 gap-y-2 text-sm">
              {settings?.legalDocuments &&
              settings.legalDocuments.length > 0 ? (
                settings.legalDocuments.map((doc) => (
                  <Link
                    key={doc._key}
                    href={`/legal/${doc.slug.current}`}
                    className="text-white/80 hover:text-white">
                    {doc.title}
                  </Link>
                ))
              ) : (
                <>
                  <Link
                    href="/legal/privacy"
                    className="text-white/80 hover:text-white">
                    Privacy Policy
                  </Link>
                  <Link
                    href="/legal/terms"
                    className="text-white/80 hover:text-white">
                    Terms and Conditions
                  </Link>
                  <Link
                    href="/legal/accessibility"
                    className="text-white/80 hover:text-white">
                    Accessibility
                  </Link>
                  <Link
                    href="/legal/cookies"
                    className="text-white/80 hover:text-white">
                    Cookie Settings
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
