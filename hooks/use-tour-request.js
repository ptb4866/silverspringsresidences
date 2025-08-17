import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useTourRequest() {
  return useMutation({
    mutationFn: async (tourData) => {
      console.log("Tour request data:", tourData);

      const { data, error } = await supabase
        .from("tour_requests")
        .insert([
          {
            first_name: tourData.firstName,
            last_name: tourData.lastName,
            email: tourData.email,
            phone: tourData.phone,
            relationship: tourData.relationship,
            location: tourData.location,
            tour_date: new Date(tourData.date).toISOString().split("T")[0],
            time_slot: tourData.timeSlot,
            group_size: tourData.groupSize,
            interests: tourData.interests || [],
            special_requests: tourData.specialRequests,
            marketing_consent: tourData.marketingConsent,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Supabase Error:", error);
        throw new Error(`Failed to schedule tour: ${error.message}`);
      }

      console.log("Tour request saved to database:", data);

      // If marketing consent is given, add to newsletter subscription
      if (tourData.marketingConsent) {
        try {
          console.log("Adding user to newsletter subscription...");

          // First, check if email already exists in newsletter subscribers
          const { data: existingSubscriber, error: checkError } = await supabase
            .from("newsletter_subscribers")
            .select("email")
            .eq("email", tourData.email)
            .single();

          if (checkError && checkError.code !== "PGRST116") {
            // PGRST116 is "not found" error, which is expected when email doesn't exist
            console.error("Error checking existing subscriber:", checkError);
          }

          if (!existingSubscriber) {
            // Insert new subscriber
            const { error: insertError } = await supabase
              .from("newsletter_subscribers")
              .insert([
                {
                  email: tourData.email,
                  subscribed_at: new Date().toISOString(),
                  status: "active",
                },
              ]);

            if (insertError && insertError.code !== "23505") {
              // 23505 is duplicate key error, which we can ignore
              console.error(
                "Error inserting newsletter subscriber:",
                insertError
              );
            }
          }

          // Add to Resend contact list
          const { error: resendError } = await supabase.functions.invoke(
            "add-to-resend-contacts",
            {
              body: {
                email: tourData.email,
                firstName: tourData.firstName,
                lastName: tourData.lastName,
              },
            }
          );

          if (resendError) {
            console.error("Error adding to Resend contacts:", resendError);
            // Don't throw error here as the tour request was successful
          } else {
            console.log("Successfully added to newsletter subscription");
          }
        } catch (newsletterError) {
          console.error("Newsletter subscription error:", newsletterError);
          // Don't throw error here as the tour request was successful
        }
      }

      // Send email notification
      try {
        console.log("Attempting to send email notification...");
        const { data: emailData, error: emailError } =
          await supabase.functions.invoke("send-tour-notification", {
            body: { tourData: data },
          });

        if (emailError) {
          console.error("Email notification error:", emailError);
          throw new Error(
            "Failed to send email notification. Please try again."
          );
        }

        if (!emailData?.success) {
          console.error("Email sending failed:", emailData);
          throw new Error(
            "Failed to send email notification. Please try again."
          );
        }

        console.log("Email notification sent successfully:", emailData);
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        throw new Error("Failed to send email notification. Please try again.");
      }

      return data;
    },
  });
}
