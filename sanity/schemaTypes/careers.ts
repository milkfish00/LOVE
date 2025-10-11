import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";

export const careers = defineType({
  name: "careers",
  title: "Careers",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Career page title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Brief description of the career page",
    }),
    defineField({
      name: "jobs",
      title: "Jobs",
      type: "array",
      description: "List of jobs",
      of: [
        {
          type: "object",
          title: "Job",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "location",
              title: "Location",
              type: "string",
            }),

            defineField({
              name: "description",
              type: "array",
              title: "Description",
              of: [
                {
                  type: "block",
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "media",
            },
            prepare(selection) {
              return {
                ...selection,
                media: CaseIcon,
              };
            },
          },
        },
      ],
    }),
  ],
});
