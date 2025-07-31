import { EmailTemplate } from "../../_components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const responce = await req.json();

    console.log("Sending to:", responce.to); // Debug log

    const { data, error } = await resend.emails.send({
      from: "fileshare@resend.dev",
      to: ["borseaakash082004@gmail.com"],
      subject: `${responce.userName} shared a file with you`,
      react: EmailTemplate({ responce }),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Catch error:", error);
    return Response.json({ error: error.message || error }, { status: 500 });
  }
}
