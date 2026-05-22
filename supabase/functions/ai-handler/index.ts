import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, payload } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let messages = [];
    
    if (action === "chat") {
      messages = [
        { 
          role: "system", 
          content: "You are an AI Productivity Coach for FocusFlow AI. Your goal is to help users overcome procrastination, stay focused, and build healthy work habits. Provide motivational advice, practical focus techniques, and empathetic support. Do not provide medical or psychological treatment advice. Keep responses concise, structured, and professional." 
        },
        ...payload.messages,
      ];
    } else if (action === "email") {
      messages = [
        {
          role: "system",
          content: "You are an expert professional communicator and email copywriter for FocusFlow AI. Your job is to generate well-structured, clear, and effective emails based on the user's instructions. Output only the email content without extra commentary."
        },
        {
          role: "user",
          content: `Write an email to ${payload.audience || 'a colleague'}. 
The tone should be ${payload.tone || 'professional'}.
Context/Key points: ${payload.context}

Please draft the email.`
        }
      ];
    } else if (action === "plan") {
      messages = [
        {
          role: "system",
          content: "You are a strategic AI Task Planner for FocusFlow AI. Your job is to take a user's task, priority, and available time, and provide a structured plan on how to tackle it. Suggest a specific focus technique (like Pomodoro, Time Blocking) and strategic break times. Output a clear, actionable markdown plan."
        },
        {
          role: "user",
          content: `Task: ${payload.task}
Priority: ${payload.priority}
Available Time: ${payload.duration} minutes

Please provide a structured plan to tackle this task efficiently.`
        }
      ];
    } else {
      throw new Error("Invalid action");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-handler error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});