import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useContactForm() {
  return useMutation({
    mutationFn: async (contactData) => {
      // First, save to database
      const { data, error } = await supabase
        .from("contact_messages")
        .insert([
          {
            full_name: contactData.fullName,
            email: contactData.email,
            phone: contactData.phone || null,
            message: contactData.message,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Database Error:", error);
        throw new Error(`Failed to save message: ${error.message}`);
      }

      // Then, send email notification
      try {
        const { data: emailData, error: emailError } =
          await supabase.functions.invoke("send-contact-notification", {
            body: { contactData: data },
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
