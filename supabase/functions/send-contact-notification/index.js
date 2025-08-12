import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const NOTIFICATION_EMAIL = "silverspringsresidence@gmail.com";

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  try {
    const { contactData } = await req.json();
    console.log("Received contact data:", JSON.stringify(contactData, null, 2));

    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p>A new message has been received through the contact form:</p>
      
      <h3>Contact Information</h3>
      <ul>
        <li><strong>Name:</strong> ${contactData.full_name}</li>
        <li><strong>Email:</strong> ${contactData.email}</li>
        ${
          contactData.phone
            ? `<li><strong>Phone:</strong> ${contactData.phone}</li>`
            : ""
        }
      </ul>

      <h3>Message</h3>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
        <p>${contactData.message.replace(/\\n/g, "<br>")}</p>
      </div>

      <p><em>This message was received on ${new Date().toLocaleString()}</em></p>
    `;

    try {
      const { data, error } = await resend.emails.send({
        from: "Silver Springs Residences <onboarding@resend.dev>",
        to: [NOTIFICATION_EMAIL],
        subject: `New Contact Form Message from ${contactData.full_name}`,
        html: emailContent,
        reply_to: contactData.email,
      });

      if (error) {
        console.error("Resend API Error:", error);
        throw error;
      }

      console.log("Email sent successfully:", data);

      return new Response(JSON.stringify({ success: true, data }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "*",
        },
      });
    } catch (emailError) {
      console.error("Detailed email error:", emailError);
      throw emailError;
    }
  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.toString(),
        stack: error.stack,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "*",
        },
      }
    );
  }
});
