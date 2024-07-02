"use server";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
export default async function sendMail(values: any, copy_subject: string) {
  const payload = await getPayloadHMR({ config });
  // send copy email to client if copy-checkbox is checked
  if (values.copy) {
    payload.sendEmail({
      from: "nodemailer@hahl.media",
      to: values.emailAddress,
      subject: copy_subject,
      html: `<h1>${copy_subject}:</h1>
      <p>${values.message}</p>`,
    });
  }
  // send email to admin
  payload.sendEmail({
    from: "nodemailer@hahl.media",
    to: "contact@hahl.media",
    //Flag in subject to filter between personal and business in mail program
    subject: `${
      values.motivationType === "business"
        ? `Business: ${values.companyName}:`
        : "Personal: "
    } ${values.name}`,
    html: `<h1>${values.name} wrote:</h1>
    <p>${values.message}</p>
    <a href="mailto:${values.emailAddress}?body=${encodeURIComponent(
      values.message
    )}">Reply</a>`,
  });
}
