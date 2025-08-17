// supabase/functions/add-resend-contact/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  Vary: "Origin",
};
const RESEND_BASE = "https://api.resend.com";
serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }
  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({
          error: "Method not allowed",
        }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    const {
      email,
      firstName,
      lastName,
      unsubscribed = false,
    } = await req.json().catch(() => ({}));
    if (!email) {
      return new Response(
        JSON.stringify({
          error: "Email is required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "Resend API key not configured",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    // Helper to call Resend
    const r = async (path, init) => {
      const res = await fetch(`${RESEND_BASE}${path}`, {
        ...init,
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(init?.headers || {}),
        },
      });
      const text = await res.text();
      let json = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {}
      return {
        res,
        json,
        text,
      };
    };
    // 1) Find the "General" audience (case-insensitive). If missing, create it.
    // GET /audiences
    const { res: listRes, json: listJson } = await r("/audiences"); // List audiences (docs). :contentReference[oaicite:1]{index=1}
    if (!listRes.ok) {
      let errorMessage = "Failed to access newsletter service";
      let errorDetails =
        listJson?.message ||
        (await listRes.text()) ||
        "Unable to access our newsletter service";

      if (listRes.status === 401) {
        errorMessage = "Newsletter service authentication error";
        errorDetails = "Unable to authenticate with our newsletter service.";
      } else if (listRes.status === 403) {
        errorMessage = "Newsletter service access denied";
        errorDetails = "Unable to access our newsletter service at this time.";
      } else if (listRes.status >= 500) {
        errorMessage = "Newsletter service temporarily unavailable";
        errorDetails =
          "Our newsletter service is experiencing issues. Please try again later.";
      }

      return new Response(
        JSON.stringify({
          error: errorMessage,
          details: errorDetails,
        }),
        {
          status: listRes.status,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    const audiences = listJson?.data ?? [];
    let audience = audiences.find((a) => a.name?.toLowerCase() === "general");
    if (!audience) {
      // Optional: auto-create "General" if not found.
      // POST /audiences  (docs). :contentReference[oaicite:2]{index=2}
      const { res: createAudRes, json: createAudJson } = await r("/audiences", {
        method: "POST",
        body: JSON.stringify({
          name: "General",
        }),
      });
      if (!createAudRes.ok) {
        let errorMessage = "Failed to setup newsletter service";
        let errorDetails =
          createAudJson?.message ||
          (await createAudRes.text()) ||
          "Unable to setup our newsletter service";

        if (createAudRes.status === 401) {
          errorMessage = "Newsletter service authentication error";
          errorDetails = "Unable to authenticate with our newsletter service.";
        } else if (createAudRes.status === 403) {
          errorMessage = "Newsletter service access denied";
          errorDetails =
            "Unable to access our newsletter service at this time.";
        } else if (createAudRes.status >= 500) {
          errorMessage = "Newsletter service temporarily unavailable";
          errorDetails =
            "Our newsletter service is experiencing issues. Please try again later.";
        }

        return new Response(
          JSON.stringify({
            error: errorMessage,
            details: errorDetails,
          }),
          {
            status: createAudRes.status,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }
      audience = {
        id: createAudJson.id,
        name: createAudJson.name,
      };
    }
    const audienceId = audience.id;
    // 2) Create the contact in that audience
    // POST /audiences/:audience_id/contacts (docs). :contentReference[oaicite:3]{index=3}
    const body = {
      email,
      // Resend accepts snake_case in raw HTTP; SDK uses camelCase.
      first_name: firstName,
      last_name: lastName,
      unsubscribed,
      // Including both forms is harmless; server ignores unknown keys.
      firstName,
      lastName,
    };
    const {
      res: createRes,
      json: createJson,
      text: createText,
    } = await r(`/audiences/${encodeURIComponent(audienceId)}/contacts`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    // If contact already exists, treat as success (idempotent UX).
    if (createRes.status === 409) {
      // Optional: you could PATCH by email to ensure fields (un)subscribed are updated. (docs). :contentReference[oaicite:4]{index=4}
      return new Response(
        JSON.stringify({
          message: "Email already subscribed to newsletter",
          details:
            "This email address is already in our newsletter contact list.",
          audienceId,
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    if (!createRes.ok) {
      let errorMessage = "Failed to add contact to newsletter";
      let errorDetails =
        createJson?.message || createText || "Unknown error occurred";

      // Provide more specific error messages based on status code
      if (createRes.status === 400) {
        errorMessage = "Invalid email address";
        errorDetails = "Please provide a valid email address format.";
      } else if (createRes.status === 401) {
        errorMessage = "Authentication error";
        errorDetails = "Unable to authenticate with our email service.";
      } else if (createRes.status === 403) {
        errorMessage = "Access denied";
        errorDetails = "Unable to access our email service at this time.";
      } else if (createRes.status === 429) {
        errorMessage = "Too many requests";
        errorDetails = "Please wait a moment before trying again.";
      } else if (createRes.status >= 500) {
        errorMessage = "Email service temporarily unavailable";
        errorDetails =
          "Our email service is experiencing issues. Please try again later.";
      }

      return new Response(
        JSON.stringify({
          error: errorMessage,
          details: errorDetails,
          status: createRes.status,
        }),
        {
          status: createRes.status,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    return new Response(
      JSON.stringify({
        message: "Successfully subscribed to newsletter",
        details: "Your email has been added to our newsletter contact list.",
        audienceId,
        contact: createJson,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error?.message || String(error),
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
