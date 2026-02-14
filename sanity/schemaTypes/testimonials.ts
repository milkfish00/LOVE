import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";

export const testimonial = defineType({
  name: "testimonials",
  title: "Testimonials",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Title of the testimonial",
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: "programSections",
      title: "Program Sections",
      type: "array",
      description: "Program sections for the program page",
      of: [
        {
          type: "object",
          title: "Testimonials",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              description: "Name of the person giving the testimonial",
              validation: (Rule) => Rule.required().min(2).max(100),
            }),
            defineField({
              name: "role",
              title: "Role",
              type: "string",
              description: "Role of the person giving the testimonial",
              options: {
                list: [
                  { title: "Parent", value: "Parent" },
                  { title: "Guardian", value: "Guardian" },
                ],
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required().min(2).max(100),
            }),
            defineField({
              name: "rating",
              title: "Rating",
              type: "number",
              description: "Rating from 1 to 5 stars",
              validation: (Rule) => Rule.required().min(1).max(5).integer(),
            }),
            defineField({
              name: "testimonial",
              title: "Testimonial",
              type: "text",
              rows: 4,
              description: "The testimonial content",
              validation: (Rule) => Rule.required().min(10).max(500),
            }),
          ],
        },
      ],
    }),
  ],
});
