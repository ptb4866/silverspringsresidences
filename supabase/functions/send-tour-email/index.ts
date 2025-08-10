import { serve } from "https://deno.fresh.dev/std@v1/http/server.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const NOTIFICATION_EMAIL = "silverspringsresidence@gmail.com";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

serve(async (req) => {
  try {
    const { tourData } = await req.json();

    const emailContent = `
      <h2>New Tour Request</h2>
      <p>A new tour has been scheduled with the following details:</p>
      
      <h3>Contact Information</h3>
      <ul>
        <li><strong>Name:</strong> ${tourData.first_name} ${
      tourData.last_name
    }</li>
        <li><strong>Email:</strong> ${tourData.email}</li>
        <li><strong>Phone:</strong> ${tourData.phone}</li>
        <li><strong>Relationship to Resident:</strong> ${
          tourData.relationship
        }</li>
      </ul>

      <h3>Tour Details</h3>
      <ul>
        <li><strong>Location:</strong> ${tourData.location}</li>
        <li><strong>Date:</strong> ${formatDate(tourData.tour_date)}</li>
        <li><strong>Time:</strong> ${tourData.time_slot}</li>
        <li><strong>Group Size:</strong> ${tourData.group_size}</li>
        <li><strong>Confirmation Number:</strong> ${
          tourData.confirmation_number
        }</li>
      </ul>

      ${
        tourData.interests?.length
          ? `
        <h3>Areas of Interest</h3>
        <ul>
          ${tourData.interests
            .map((interest: string) => `<li>${interest}</li>`)
            .join("")}
        </ul>
      `
          : ""
      }

      ${
        tourData.special_requests
          ? `
        <h3>Special Requests</h3>
        <p>${tourData.special_requests}</p>
      `
          : ""
      }

      <p><em>Marketing Consent: ${
        tourData.marketing_consent ? "Yes" : "No"
      }</em></p>
    `;

    const { data, error } = await resend.emails.send({
      from: "Silver Springs Residences <tours@silverspringsresidences.com>",
      to: [NOTIFICATION_EMAIL],
      subject: `New Tour Request - ${tourData.first_name} ${tourData.last_name}`,
      html: emailContent,
    });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
