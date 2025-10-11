import { defineField, defineType } from "sanity";
import { SparklesIcon } from "@sanity/icons";

export const tuition = defineType({
  name: "tuition",
  title: "Tuition & Enrollment",
  type: "document",
  icon: SparklesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Tuition & Enrollmen",
    }),
    defineField({
      name: "description",
      title: "Page Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "enrollmentProcess",
      title: "Enrollment Process",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "stepNumber",
              title: "Step Number",
              type: "number",
            }),
            defineField({
              name: "title",
              title: "Step Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Step Description",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "stepNumber",
            },
            prepare(selection) {
              return {
                title: selection.title,
                subtitle: `Step ${selection.subtitle}`,
                media: SparklesIcon,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "tuitionPayments",
      title: "Tuition & Payments",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "button",
              title: "Button",
              type: "object",
              fields: [
                defineField({
                  name: "text",
                  title: "Button Text",
                  type: "string",
                }),
                defineField({
                  name: "url",
                  title: "Button URL",
                  type: "string",
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
            prepare(selection) {
              return {
                title: selection.title,
                subtitle: selection.subtitle,
                media: SparklesIcon,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "financialAid",
      title: "Financial Aid",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "CTA Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "CTA Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "button",
              title: "Button",
              type: "object",
              fields: [
                defineField({
                  name: "text",
                  title: "Button Text",
                  type: "string",
                }),
                defineField({
                  name: "url",
                  title: "Button URL",
                  type: "string",
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
            prepare(selection) {
              return {
                title: selection.title,
                subtitle: selection.subtitle,
                media: SparklesIcon,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "ctaSection",
      title: "Call to Action Section",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "CTA Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "CTA Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "button",
              title: "Button",
              type: "object",
              fields: [
                defineField({
                  name: "text",
                  title: "Button Text",
                  type: "string",
                }),
                defineField({
                  name: "url",
                  title: "Button URL",
                  type: "string",
                }),
              ],
            }),
            defineField({
              name: "secondButton",
              title: "Second Button",
              type: "object",
              fields: [
                defineField({
                  name: "text",
                  title: "Button Text",
                  type: "string",
                }),
                defineField({
                  name: "url",
                  title: "Button URL",
                  type: "string",
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
            prepare(selection) {
              return {
                title: selection.title,
                subtitle: selection.subtitle,
                media: SparklesIcon,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});
