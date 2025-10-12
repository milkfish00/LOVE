import { defineField, defineType } from "sanity";
import { DocumentsIcon } from "@sanity/icons";
import {
  FileText,
  BookOpen,
  Users,
  UserCheck,
  CheckSquare,
} from "lucide-react";

export const resources = defineType({
  name: "resources",
  title: "Resources",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "resourcesHero",
      title: "Resources Hero",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Page Title",
              type: "string",
              description: "The main title for the resources page",
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: "description",
              title: "Page Description",
              type: "text",
              rows: 3,
              description: "Brief description of the resources page",
              validation: (Rule) => Rule.max(500),
            }),
            defineField({
              name: "backgroundImage",
              title: "Background Image",
              type: "image",
              description:
                "Recommended: 1920×1080 (16:9). Upload ≥2400px wide. Center important content and enable hotspot.",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
              media: "backgroundImage",
            },
            prepare({ title, description, media }) {
              return {
                title: title || "Resources Hero",
                subtitle: description || "All Resources",
                media: media,
              };
            },
          },
        },
      ],
    }),

    defineField({
      name: "resources",
      title: "Resources",
      type: "array",
      description: "List of resources",
      of: [
        {
          type: "object",
          title: "Resource",
          fields: [
            defineField({
              name: "resourceTitle",
              title: "Resource Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: (_doc, { parent }) =>
                  (parent as any)?.resourceTitle || "",
                maxLength: 96,
                slugify: (input: string) =>
                  input
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .slice(0, 96),
              },
              hidden: ({ parent }) => (parent as any)?.type === "file",
              validation: (Rule) =>
                Rule.custom((value, { parent }) => {
                  if ((parent as any)?.type === "file") return true;
                  return value && (value as any)?.current
                    ? true
                    : "Slug is required unless type is File";
                }),
            }),
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Guide", value: "guide" },
                  { title: "Checklist", value: "checklist" },
                  { title: "File", value: "file" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Short Description",
              type: "text",
              rows: 3,
              hidden: ({ parent }) => (parent as any)?.type === "file",
            }),
            defineField({
              name: "tags",
              title: "Tags",
              type: "array",
              description: "Add tags to enable filtering on the resources page",
              of: [{ type: "string" }],
              options: {
                list: [
                  { title: "Staff", value: "staff" },
                  { title: "Parents", value: "parents" },
                  { title: "Forms", value: "forms" },
                  { title: "Health & Safety", value: "health-safety" },
                ],
              },
            }),
            defineField({
              name: "content",
              title: "Guide Content",
              type: "array",
              hidden: ({ parent }) => (parent as any)?.type !== "guide",
              of: [{ type: "block" }],
              validation: (Rule) =>
                Rule.custom((value, { parent }) => {
                  if (
                    (parent as any)?.type === "guide" &&
                    (!value || value.length === 0)
                  ) {
                    return "Guide content is required when type is Guide";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "checklistItems",
              title: "Checklist Items",
              type: "array",
              hidden: ({ parent }) => (parent as any)?.type !== "checklist",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "item",
                      title: "Item",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "details",
                      title: "Details",
                      type: "text",
                      rows: 2,
                    }),
                  ],
                },
              ],
              validation: (Rule) =>
                Rule.custom((value, { parent }) => {
                  if (
                    (parent as any)?.type === "checklist" &&
                    (!value || value.length === 0)
                  ) {
                    return "Please add at least one checklist item";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "downloadPdf",
              title: "Download PDF",
              type: "file",
              description: "PDF file for download",
              options: { accept: ".pdf" },
              validation: (Rule) =>
                Rule.custom((value, { parent }) => {
                  if ((parent as any)?.type === "file" && !value?.asset) {
                    return "PDF is required when type is File";
                  }
                  return true;
                }),
            }),
          ],
          preview: {
            select: {
              title: "resourceTitle",
              type: "type",
            },
            prepare({ title, type }) {
              const typeIcons: Record<string, any> = {
                file: FileText,
                guide: BookOpen,
                checklist: CheckSquare,
                parents: Users,
                staff: UserCheck,
              };
              return {
                title: title || "Untitled Resource",
                subtitle: type ? `Type: ${type}` : "",
                media: type ? typeIcons[type] || DocumentsIcon : DocumentsIcon,
              };
            },
          },
        },
      ],
    }),
    
  ],
  preview: {
    select: {
      title: "resourcesHero.0.title",
      description: "resourcesHero.0.description",
    },
    prepare({ title, description }) {
      return {
        title: title || "Resources",
        subtitle: description
          ? description.substring(0, 100) + "..."
          : "No description",
      };
    },
  },
});
