import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";
import { DocumentsIcon } from "@sanity/icons";
import {LinkIcon} from '@sanity/icons'

import {
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Globe,
  Mail,
  HelpCircle,
} from "lucide-react";

export const settings = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    {
      name: "general",
      title: "General",
      default: true,
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "social",
      title: "Social Media",
    },
    {
      name: "banner",
      title: "Banner",
    },
    {
      name: "branding",
      title: "Branding",
    },
    {
      name: "legal",
      title: "Legal Documents",
    },
  ],
  fields: [
    // General Section
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      description: "Main title for the website (used for SEO and display)",
      validation: (Rule) => Rule.required().max(60),
      group: "general",
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
      description:
        "Brief description of the website (used for SEO and display)",
      validation: (Rule) => Rule.required().max(160),
      group: "general",
    }),

    // SEO Section
    defineField({
      name: "seoKeywords",
      title: "SEO Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Keywords for search engine optimization",
      group: "seo",
    }),
    defineField({
      name: "openGraphImage",
      title: "Open Graph Image",
      type: "image",
      description:
        "Image shown when sharing on social media. Recommended: 1200×630. Keep critical content within safe margins.",
      group: "seo",
    }),

    // Social Media Section

    // Social Media
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",

      group: "social",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Twitter/X", value: "twitter" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                ],
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
            }),
          ],
          preview: {
            select: {
              platform: "platform",
              url: "url",
              text: "displayText",
            },
            prepare({ platform, url, text }) {
              const platformIcons = {
                twitter: Twitter,
                linkedin: Linkedin,
                facebook: Facebook,
                instagram: Instagram,
                youtube: Youtube,
                website: Globe,
                email: Mail,
                other: HelpCircle,
              };

              return {
                title:
                  text ||
                  (platform
                    ? platform.charAt(0).toUpperCase() + platform.slice(1)
                    : "Social Link"),
                subtitle: url,
                media:
                  typeof platform === "string" && platform in platformIcons
                    ? platformIcons[platform as keyof typeof platformIcons]
                    : HelpCircle,
              };
            },
          },
        },
      ],
    }),

    //Banner

    defineField({
      name: "banner",
      title: "Banner",
      type: "array",
      group: "banner",
      icon: LinkIcon,
      of: [
        {
          name: "banner",
          title: "Banner",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Text",
              type: "string",
              description: "Text to display in the banner",
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
              description: "Subtitle to display in the banner",
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: "buttonText",
              title: "Button Text",
              type: "string",
              description: "Text to display in the button",
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "url",
              description: "URL the banner text links to",
              validation: (Rule) =>
                Rule.uri({
                  allowRelative: true,
                  scheme: ["http", "https", "mailto", "tel"],
                }),
            }),
          ],
          preview: {
            select: {
              title: "text",
              subtitle: "link",

            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Banner",
                subtitle: subtitle || "No link provided",
                media: LinkIcon,
              };
            },
          },
        },
      ],
    }),

    // Branding Section
    defineField({
      name: "navLogo",
      title: "Navbar Logo",
      type: "image",
      options: { hotspot: true },
      description:
        "Main logo for the website. Recommended: SVG preferred. For raster, 1024×1024 PNG with transparent background.",
      group: "branding",
    }),
    defineField({
      name: "footerLogo",
      title: "Footer Logo",
      type: "image",
      options: { hotspot: true },
      description:
        "Main logo for the website. Recommended: SVG preferred. For raster, 1024×1024 PNG with transparent background.",
      group: "branding",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "file",
      options: {
        accept: ".ico",
      },
      description: "Small icon shown in browser tabs. Upload a .ico file.",
      group: "branding",
    }),

    // Legal Documents Section
    defineField({
      name: "legalDocuments",
      title: "Legal Documents",
      type: "array",
      group: "legal",
      description:
        "Manage legal documents like Privacy Policy, Terms and Conditions, etc.",
      of: [
        {
          type: "object",
          name: "legalDocument",
          title: "Legal Document",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description:
                "Document title (e.g., Privacy Policy, Terms and Conditions)",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: (doc, options) => {
                  const parent = options.parent as { title?: string };
                  return parent?.title || "";
                },
                maxLength: 96,
                slugify: (input: string) =>
                  input
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .slice(0, 96),
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "content",
              title: "Content",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [
                    { title: "Normal", value: "normal" },
                    { title: "H1", value: "h1" },
                    { title: "H2", value: "h2" },
                    { title: "H3", value: "h3" },
                    { title: "H4", value: "h4" },
                    { title: "Quote", value: "blockquote" },
                  ],
                  lists: [
                    { title: "Bullet", value: "bullet" },
                    { title: "Number", value: "number" },
                  ],
                  marks: {
                    decorators: [
                      { title: "Strong", value: "strong" },
                      { title: "Emphasis", value: "em" },
                      { title: "Code", value: "code" },
                    ],
                    annotations: [
                      {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [
                          {
                            name: "href",
                            type: "url",
                            title: "URL",
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
              description: "Full content of the legal document",
            }),
          ],
          preview: {
            select: {
              title: "title",
            },
            prepare({ title }) {
              return {
                title: title || "Legal Document",
                media: DocumentsIcon,
              };
            },
          },
        },
      ],
    }),
  ],
});
