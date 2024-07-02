import { CollectionConfig } from "payload/types";
// Custom Dictionary Payload Component for creating new Dictionaries in json format side by side
export const Dictionaries: CollectionConfig = {
  slug: "dictionaries",
  admin: {
    useAsTitle: "name",
  },
  labels: {
    singular: "Dictionarie",
    plural: "Dictionaries",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
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
        {
          name: "en", // required
          type: "json", // required
          required: true,
        },
        {
          name: "de", // required
          type: "json", // required
          required: true,
        },
      ],
    },
  ],
};
