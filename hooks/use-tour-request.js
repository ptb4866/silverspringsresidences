import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

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

      // Send email notification
      try {
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
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        throw new Error("Failed to send email notification. Please try again.");
      }

      return data;
    },
  });
}
