import { CollectionConfig } from "payload/types";
// A custom ordered dictionary Payload Component for creating new Pages in custom array text structure format side by side
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "name",
  },
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      unique: true,
      required: true,
    },
    {
      type: "row", // required
      fields: [
        // required
        {
          name: "en_title", // required
          type: "text", // required
          label: "English title",
          admin: {
            width: "50%",
          },
        },
        {
          name: "de_title", // required
          type: "text", // required
          label: "German title",
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row", // required
      fields: [
        // required
        {
          name: "en_description", // required
          type: "textarea", // required
          label: "English description",
          admin: {
            width: "50%",
          },
        },
        {
          name: "de_description", // required
          type: "textarea", // required
          label: "German description",
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      name: "topics",
      type: "array",
      label: "Topics",
      fields: [
        {
          name: "slug",
          type: "text",
          label: "Slug",
          unique: true,
          required: true,
        },
        {
          type: "row", // required
          fields: [
            // required
            {
              name: "en_title", // required
              type: "text", // required
              label: "English title",

              admin: {
                width: "50%",
              },
            },
            {
              name: "de_title", // required
              type: "text", // required
              label: "German title",

              admin: {
                width: "50%",
              },
            },
          ],
        },
        {
          type: "row", // required
          fields: [
            // required
            {
              name: "en_description", // required
              type: "textarea", // required
              label: "English description",
              admin: {
                width: "50%",
              },
            },
            {
              name: "de_description", // required
              type: "textarea", // required
              label: "German description",
              admin: {
                width: "50%",
              },
            },
          ],
        },
        {
          name: "projects",
          type: "array",
          label: "Projects",
          fields: [
            {
              name: "slug",
              type: "text",
              label: "Slug",
              unique: true,
              required: true,
            },
            {
              type: "row", // required
              fields: [
                // required
                {
                  name: "en_title", // required
                  type: "text", // required
                  label: "English title",

                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "de_title", // required
                  type: "text", // required
                  label: "German title",

                  admin: {
                    width: "50%",
                  },
                },
              ],
            },
            {
              type: "row", // required
              fields: [
                // required
                {
                  name: "en_description", // required
                  type: "textarea", // required
                  label: "English description",
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "de_description", // required
                  type: "textarea", // required
                  label: "German description",
                  admin: {
                    width: "50%",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
