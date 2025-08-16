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
    const { tourData } = await req.json();
    console.log("Received tour data:", JSON.stringify(tourData, null, 2));

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const formatTime = (timeSlot) => {
      const timeMap = {
        "9:00": "9:00 AM",
        "10:00": "10:00 AM",
        "11:00": "11:00 AM",
        "1:00": "1:00 PM",
        "2:00": "2:00 PM",
        "3:00": "3:00 PM",
        "4:00": "4:00 PM",
      };
      return timeMap[timeSlot] || timeSlot;
    };

    const formatLocation = (location) => {
      const locationMap = {
        braverde: "Braverde House",
      };
      return locationMap[location] || location;
    };

    const emailContent = `
      <h2>New Tour Request</h2>
      <p>A new tour has been scheduled through the website:</p>
      
      <h3>Visitor Information</h3>
      <ul>
        <li><strong>Name:</strong> ${tourData.first_name} ${
      tourData.last_name
    }</li>
        <li><strong>Email:</strong> ${tourData.email}</li>
        <li><strong>Phone:</strong> ${tourData.phone}</li>
        <li><strong>Relationship:</strong> ${tourData.relationship}</li>
      </ul>

             <h3>Tour Details</h3>
       <ul>
         <li><strong>Location:</strong> ${formatLocation(
           tourData.location
         )}</li>
         <li><strong>Date:</strong> ${formatDate(tourData.tour_date)}</li>
         <li><strong>Time:</strong> ${formatTime(tourData.time_slot)}</li>
         <li><strong>Group Size:</strong> ${tourData.group_size}</li>
       </ul>

      ${
        tourData.interests && tourData.interests.length > 0
          ? `
      <h3>Areas of Interest</h3>
      <ul>
        ${tourData.interests.map((interest) => `<li>${interest}</li>`).join("")}
      </ul>
      `
          : ""
      }

      ${
        tourData.special_requests
          ? `
      <h3>Special Requests</h3>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
        <p>${tourData.special_requests.replace(/\\n/g, "<br>")}</p>
      </div>
      `
          : ""
      }

      <p><strong>Marketing Consent:</strong> ${
        tourData.marketing_consent ? "Yes" : "No"
      }</p>
      <p><strong>Confirmation Number:</strong> ${tourData.id}</p>

      <p><em>This tour request was submitted on ${new Date().toLocaleString()}</em></p>
    `;

    try {
      const { data, error } = await resend.emails.send({
        from: "Silver Springs Residences <onboarding@resend.dev>",
        to: [NOTIFICATION_EMAIL],
        subject: `New Tour Request from ${tourData.first_name} ${tourData.last_name}`,
        html: emailContent,
        reply_to: tourData.email,
      });

      if (error) {
        console.error("Resend API Error:", error);
        throw error;
      }

      console.log("Tour notification email sent successfully:", data);

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
