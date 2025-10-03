import { defineType, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const home = defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: HomeIcon,
  fields: [
    // Hero Section
    defineField({
      name: "heroSections",
      title: "Hero Sections",
      type: "array",
      description: "Hero sections for the homepage",
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
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              description: "Supporting text below the headline",
            },
            {
              name: "Button",
              title: "Button",
              type: "object",
              description: "Primary action button",
              fields: [
                { name: "text", title: "Button Text", type: "string" },
                {
                  name: "link",
                  title: "Button Link",
                  type: "string",
                  description: "Button link URL",
                },
              ],
            },
            {
              name: "backgroundImage",
              title: "Background Image",
              type: "image",
              description:
                "Background image for the hero section. Recommended: 1920×1080 (16:9). Upload ≥2400px wide. Center important content and enable hotspot.",
              options: { hotspot: true },
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

    // Who are we Section
    defineField({
      name: "aboutSections",
      title: "About Sections",
      type: "array",
      description: "About sections",
      of: [
        {
          type: "object",
          title: "About Section",
          fields: [
            {
              name: "title",
              title: "Section Title",
              type: "string",
              description: "Section title",
              initialValue: "About",
            },
            {
              name: "subtitle",
              title: "Section Subtitle",
              type: "text",
              rows: 2,
     
            },
            {
              name: "button",
              title: "Button",
              type: "object",
              description: "Button",
              fields: [
                { name: "text", title: "Button Text", type: "string" },
                { name: "link", title: "Button Link", type: "string" },
              ],
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              description:
                "Recommended: 1600×900 (16:9), minimum width 1600px. Use hotspot to set the focal point.",
              options: { hotspot: true },
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subtitle",
              media: "image",
            },
          },
        },
      ],
    }),

    // CTA 1 Section
    defineField({
      name: "cta1Sections",
      title: "CTA 1 Sections",
      type: "array",
      description: "CTA 1 sections",
      of: [
        {
          type: "object",
          title: "CTA 1 Section",
          fields: [
            {
              name: "title",
              title: "Section Title",
              type: "string",
              description: "Section title",
              initialValue: "CTA 1",
            },
            {
              name: "subtitle",
              title: "Section Subtitle",
              type: "text",
              rows: 2,
              description: "Optional subtitle text",
            },

            {
              name: "image",
              title: "Image",
              type: "image",
              description:
                "Recommended: 1600×900 (16:9), minimum width 1600px. Use hotspot to set the focal point.",
              options: { hotspot: true },
            },
            {
              name: "Button",
              title: "Button",
              type: "object",
              description: "Primary action button",
              fields: [
                { name: "text", title: "Button Text", type: "string" },
                {
                  name: "link",
                  title: "Button Link",
                  type: "string",
                  description: "Button link URL",
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subtitle",
              media: "image",
            },
          },
        },
      ],
    }),

    // CTA 2 Section
    defineField({
      name: "cta2Sections",
      title: "CTA 2 Sections",
      type: "array",
      description: "CTA 2 sections",
      of: [
        {
          type: "object",
          title: "CTA 2 Section",
          fields: [
            {
              name: "title",
              title: "Section Title",
              type: "string",
              description: "Section title",
              initialValue: "CTA 2",
            },
            {
              name: "subtitle",
              title: "Section Subtitle",
              type: "text",
              rows: 2,
              description: "Optional subtitle text",
            },

            {
              name: "image",
              title: "Image",
              type: "image",
              description:
                "Recommended: 1600×900 (16:9), minimum width 1600px. Use hotspot to set the focal point.",
              options: { hotspot: true },
            },
            {
              name: "Button",
              title: "Button",
              type: "object",
              description: "Primary action button",
              fields: [
                { name: "text", title: "Button Text", type: "string" },
                {
                  name: "link",
                  title: "Button Link",
                  type: "string",
                  description: "Button link URL",
                },
              ],
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subtitle",
              media: "image",
            },
          },
        },
      ],
    }),

    // Testimonials Section
    defineField({
      name: "testimonialsSections",
      title: "Testimonials Sections",
      type: "array",
      readOnly: true,
      description: "Testimonials sections",
      of: [
        {
          type: "object",
          title: "Testimonials Section",
          fields: [
            {
              name: "title",
              title: "Section Title",
              type: "string",
              description: "Section title",
              initialValue: "What Parents Say",
            },
            {
              name: "subtitle",
              title: "Section Subtitle",
              type: "text",
              rows: 2,
              description: "Optional subtitle text",
            },
            {
              name: "testimonials",
              title: "Testimonials",
              type: "array",
              description: "List of testimonials",
              of: [
                {
                  type: "object",
                  title: "Testimonial",
                  fields: [
                    {
                      name: "quote",
                      title: "Quote",
                      type: "text",
                      rows: 4,
                      description: "Testimonial quote",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "author",
                      title: "Author Name",
                      type: "string",
                      description: "Name of the person giving the testimonial",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "role",
                      title: "Role/Title",
                      type: "string",
                      description:
                        "Role or title of the author (e.g., 'Parent', 'Guardian')",
                    },
                    {
                      name: "childProgram",
                      title: "Child's Program",
                      type: "string",
                      description:
                        "Program the child is enrolled in (optional)",
                    },
                  ],
                  preview: {
                    select: {
                      title: "author",
                      subtitle: "quote",
                    },
                    prepare({ title, subtitle }) {
                      return {
                        title: title || "Testimonial",
                        subtitle: subtitle
                          ? subtitle.substring(0, 50) + "..."
                          : "",
                          media: HomeIcon,
                      };
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.min(1),
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subtitle",
           
            },
          },
        },
      ],
    }),

    // FAQ Section
    defineField({
      name: "faqSections",
      title: "FAQ Sections",
      type: "array",
      description: "FAQ sections",
      of: [
        {
          type: "object",
          title: "FAQ Section",
          fields: [
            {
              name: "title",
              title: "Section Title",
              type: "string",
              description: "Section title",
              initialValue: "Frequently Asked Questions",
            },
            {
              name: "subtitle",
              title: "Section Subtitle",
              type: "text",
              rows: 2,
              description: "Optional subtitle text",
            },
            {
              name: "faqs",
              title: "FAQs",
              type: "array",
              description: "List of frequently asked questions",
              of: [
                {
                  type: "object",
                  title: "FAQ Item",
                  fields: [
                    {
                      name: "question",
                      title: "Question",
                      type: "string",
                      description: "The question being asked",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "answer",
                      title: "Answer",
                      type: "text",
                      rows: 4,
                      description: "The answer to the question",
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      title: "question",
                      subtitle: "answer",
                    },
                    prepare({ title, subtitle }) {
                      return {
                        title: title || "FAQ Item",
                        subtitle: subtitle
                          ? subtitle.substring(0, 50) + "..."
                          : "",
                      };
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.min(1),
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subtitle",
                  
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "heroSections.0.headline",
    },
    prepare({ title }) {
      return {
        title: title || "Home",
        subtitle: "Love & Learning Child Care Center",
      };
    },
  },
});

// Export the schema
export default home;
