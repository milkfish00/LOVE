import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  icon: UsersIcon,
  preview: {
    select: {
      title: "heroSections.0.headline",
      subtitle: "staffSections.0.name",
      media: "heroSections.0.backgroundImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "About Page",
        subtitle: subtitle ? `Staff: ${subtitle}` : "No staff added",
        media: media,
      };
    },
  },
  fields: [
    defineField({
      name: "heroSections",
      title: "Hero Sections",
      type: "array",
      description: "Hero sections for the about page",
      of: [
        {
          type: "object",
          title: "Hero Section",
          fields: [
            {
              name: "headline",
              title: "Main Headline",
              type: "string",
          
              description: "Main headline text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "subtitle",
              title: "Subtitle",
              type: "text",
              rows: 3,
              description: "Supporting text below the headline",
            },

            {
              name: "backgroundImage",
              title: "Background Image",
              type: "image",
              description:
                "Background image for the hero section. Recommended: 1920×1080 (16:9). Upload ≥2400px wide. Center important content and enable hotspot.",
              options: { hotspot: true },
            },
            {
              name: "description",
              type: "array",
              title: "Description",
              of: [
                {
                  type: "block",
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "headline",
              media: "backgroundImage",
            },
            prepare({ title, media }) {
              return {
                title: title || "Hero Section",
                media: media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(3),
    }),
    defineField({
      name: "staffSections",
      title: "Staff Sections",
      type: "array",
      description: "Staff sections",
      of: [
        {
          type: "object",
          title: "Staff Section",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "role",
              title: "Role",
              type: "string",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              description:
                "Recommended: 1200×1200 (1:1) square. Keep the subject centered and use hotspot for optimal crops.",
              options: { hotspot: true },
            }),

            defineField({
              name: "bio",
              title: "Bio",
              type: "text",
              rows: 4,
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "role",
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Staff Member",
                subtitle: subtitle || "No role specified",
                media: media,
              };
            },
          },
        },
      ],
    }),
  ],
});
