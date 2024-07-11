// import { CollectionConfig } from "payload/types";
// // Custom Media Payload Component for uploading new Media and information such as usage in pages and type
// export const Media: CollectionConfig = {
//   slug: "media",
//   upload: {
//     staticDir: "public/uploads",
//     imageSizes: [
//       {
//         name: "thumbnail",
//         width: 400,
//         height: 300,
//         position: "centre",
//       },
//       {
//         name: "card",
//         width: 768,
//         height: 1024,
//         position: "centre",
//       },
//       {
//         name: "tablet",
//         width: 1024,
//         // By specifying `undefined` or leaving a height undefined,
//         // the image will be sized to a certain width,
//         // but it will retain its original aspect ratio
//         // and calculate a height automatically.
//         height: undefined,
//         position: "centre",
//       },
//     ],
//     adminThumbnail: "thumbnail",
//     mimeTypes: ["image/*"],
//   },
//   fields: [
//     {
//       name: "alt",
//       type: "text",
//     },
//     {
//       name: "hero", // required
//       type: "select", // required
//       hasMany: false,
//       admin: {
//         isClearable: true,
//         isSortable: true, // use mouse to drag and drop different values, and sort them according to your choice
//       },
//       options: [
//         {
//           label: "Home",
//           value: "home",
//         },
//         {
//           label: "Home(dark)",
//           value: "home_dark",
//         },
//         {
//           label: "Design",
//           value: "design",
//         },
//         {
//           label: "Design(dark)",
//           value: "design_dark",
//         },
//         {
//           label: "Concept",
//           value: "concept",
//         },
//         {
//           label: "Concept(dark)",
//           value: "concept_dark",
//         },
//         {
//           label: "Development",
//           value: "development",
//         },
//         {
//           label: "Development(dark)",
//           value: "development_dark",
//         },
//         {
//           label: "Production",
//           value: "production",
//         },
//         {
//           label: "Production(dark)",
//           value: "production_dark",
//         },
//       ],
//     },
//     {
//       name: "usage", // required
//       type: "select", // required
//       hasMany: true,
//       admin: {
//         isClearable: true,
//         isSortable: true, // use mouse to drag and drop different values, and sort them according to your choice
//       },
//       options: [
//         {
//           label: "Home",
//           value: "home",
//         },
//         {
//           label: "Home(dark)",
//           value: "home_dark",
//         },
//         {
//           label: "Design",
//           value: "design",
//         },
//         {
//           label: "Design(dark)",
//           value: "design_dark",
//         },
//         {
//           label: "Concept",
//           value: "concept",
//         },
//         {
//           label: "Concept(dark)",
//           value: "concept_dark",
//         },
//         {
//           label: "Development",
//           value: "development",
//         },
//         {
//           label: "Development(dark)",
//           value: "development_dark",
//         },
//         {
//           label: "Production",
//           value: "production",
//         },
//         {
//           label: "Production(dark)",
//           value: "production_dark",
//         },
//       ],
//     },
//     {
//       type: "row", // required
//       fields: [
//         // required
//         {
//           name: "en", // required
//           label: "Info in English",
//           type: "textarea", // required
//           admin: {
//             width: "50%",
//           },
//         },
//         {
//           name: "de", // required
//           label: "Info in German",
//           type: "textarea", // required
//           admin: {
//             width: "50%",
//           },
//         },
//       ],
//     },
//     {
//       name: "topics",
//       type: "array",
//       label: "Topics",
//       fields: [
//         {
//           name: "topic",
//           type: "text",
//         },
//       ],
//     },
//   ],
// };
