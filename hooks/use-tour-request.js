import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

export function useTourRequest() {
  return useMutation({
    mutationFn: async (tourData) => {
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
            tour_date: format(tourData.date, "yyyy-MM-dd"),
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

      // If marketing consent is given, add to newsletter subscription
      if (tourData.marketingConsent) {
        try {
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
                insertError,
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
            },
          );

          if (resendError) {
            console.error("Error adding to Resend contacts:", resendError);
            // Don't throw error here as the tour request was successful
          }
        } catch (newsletterError) {
          console.error("Newsletter subscription error:", newsletterError);
          // Don't throw error here as the tour request was successful
        }
      }

      // Send email notification
      try {
        const { data: emailData, error: emailError } =
          await supabase.functions.invoke("send-tour-notification", {
            body: { tourData: data },
          });

        if (emailError) {
          console.error("Email notification error:", emailError);
          throw new Error(
            "Failed to send email notification. Please try again.",
          );
        }

        if (!emailData?.success) {
          console.error("Email sending failed:", emailData);
          throw new Error(
            "Failed to send email notification. Please try again.",
          );
        }
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // The request is already saved. Do not encourage a duplicate submission
        // if the separate notification service is unavailable.
      }

      return data;
    },
  });
}
