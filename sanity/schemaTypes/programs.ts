import { defineType, defineField, SlugSourceFn } from "sanity";
import { SchemaIcon } from "@sanity/icons";

export const program = defineType({
  name: "programs",
  title: "Programs",
  type: "document",
  icon: SchemaIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Program page title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Brief description of the program page",
    }),
    defineField({
      name: "programSections",
      title: "Program Sections",
      type: "array",
      description: "Program sections for the program page",
      of: [
        {
          type: "object",
          title: "Program Section",
          fields: [
            defineField({
              name: "programTitle",
              title: "Program Title",
              type: "string",
              validation: (Rule) => Rule.required().max(50),
            }),
            defineField({
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: (doc, options) => {
                  const parent = options.parent as { programTitle?: string };
                  return parent?.programTitle || "";
                },
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "ageRange",
              title: "Age Range",
              type: "string",
              description: 'e.g., "6 years", "3-4 years"',
              validation: (Rule) => Rule.required(),
            }),
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
            defineField({
              name: "image",
              title: "Program Image",
              type: "image",
              options: {
                hotspot: true,
              },
              description:
                "Recommended: 1600×900 (16:9). Upload ≥1600px wide and set hotspot to keep the subject in frame.",
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alternative Text",
                  description: "Important for SEO and accessibility.",
                },
              ],
            }),

            defineField({
              name: "classSize",
              title: "Class Size",
              type: "string",
              description: 'e.g., "12:1 (childrern to staff)"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "schedule",
              title: "Schedule",
              type: "string",
              description: 'e.g., "8:30 AM - 3:30 PM"',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "dailyActivities",
              title: "Daily Schedule",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "time",
                      title: "Time",
                      type: "string",
                      description: 'e.g., "8:30 - 9:30 AM"',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "activity",
                      title: "Activity Name",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "description",
                      title: "Activity Description",
                      type: "text",
                      rows: 2,
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      title: "activity",
                      subtitle: "time",
                    },
                  },
                },
              ],
            }),

            defineField({
              name: "order",
              title: "Display Order",
              type: "number",
              description:
                "Order in which programs should be displayed (lower numbers first)",
              initialValue: 0,
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      media: "programSections.0.image",
    },
    prepare({ title, description }) {
      return {
        title: title || "Program",
        subtitle: description || "No description",
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
