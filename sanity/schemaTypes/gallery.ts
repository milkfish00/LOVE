import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Gallery page title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Brief description of the gallery page",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              description:
                "Recommended: 2000×1500 (4:3). Upload ≥2000px wide. Use hotspot to keep the subject centered across crops.",
              options: { hotspot: true },
            }),
            defineField({
              name: "alt",
              title: "Alt",
              type: "string",
              description: "Alt text for the image",
            }),
          ],
        },
      ],
      description: "List of gallery images",
    }),
  ],
});