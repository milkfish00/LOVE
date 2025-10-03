import { EnvelopeIcon, } from "@sanity/icons";
import { defineField, defineType } from "sanity";   


        export const contact = defineType({
          name: "contact",
          title: "Contact",
          type: "document",
          icon: EnvelopeIcon,
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
              rows: 3,
            }),
            defineField({
              name: "contactInformation",
              title: "Contact Information",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "contactMethod",
                  title: "Contact Method",
                  fields: [
                    defineField({
                      name: "type",
                      title: "Type",
                      type: "string",
                      options: {
                        list: [
                          { title: "Phone", value: "phone" },
                          { title: "Email", value: "email" },
                          { title: "Address", value: "address" },
                          { title: "Operating Hours", value: "operatingHours" },
                        ],
                      },
                    }),
                    defineField({
                      name: "title",
                      title: "Title",
                      type: "string",
                    }),

                    // Phone fields
                    defineField({
                      name: "number",
                      title: "Phone Number",
                      type: "string",
                      hidden: ({ parent }) => parent?.type !== "phone",
                    }),
                    // Email fields
                    defineField({
                      name: "address",
                      title: "Email Address",
                      type: "string",
                      hidden: ({ parent }) => parent?.type !== "email",
                    }),
                    // Address fields
                    defineField({
                      name: "street",
                      title: "Street Address",
                      type: "string",
                      hidden: ({ parent }) => parent?.type !== "address",
                    }),
                    // Operating Hours fields
                    defineField({
                      name: "hours",
                      title: "Operating Hours",
                      type: "string",
                      hidden: ({ parent }) => parent?.type !== "operatingHours",
                    }),
                    defineField({
                      name: "subtitle",
                      title: "Subtitle",
                      type: "string",
                    }),
                  ],
                },
              ],
            }),

          ],
        }); 