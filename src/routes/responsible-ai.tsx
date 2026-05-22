import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldAlert, Info, Lock, Eye } from "lucide-react";

export const Route = createFileRoute("/responsible-ai")({
  component: ResponsibleAI,
});

function ResponsibleAI() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Ethics & Privacy Policy</h1>
        <p className="text-muted-foreground mt-2">
          How FocusFlow AI uses artificial intelligence responsibly.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <CardTitle>Not Medical or Psychological Advice</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            <p>
              FocusFlow AI is designed to assist with productivity, task management, and communication. The advice provided by the AI Coach is generated based on productivity principles and general knowledge. 
            </p>
            <p className="mt-4 font-medium text-foreground">
              This application is not a replacement for professional psychological treatment, therapy, or medical advice. If you are experiencing severe anxiety, chronic burnout, depression, or ADHD-related distress that severely impacts your daily life, please consult a qualified healthcare professional.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                <Info className="w-6 h-6" />
              </div>
              <CardTitle>AI Verification & Accuracy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            <p>
              While our AI models (powered by Google Gemini) are highly capable, they can occasionally produce inaccurate information ("hallucinations").
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Always verify important facts, especially when generating emails to clients or professors.</li>
              <li>Read through generated emails and schedules before blindly applying them.</li>
              <li>You are always in control — use the AI outputs as a starting draft, not the final word.</li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                  <Lock className="w-6 h-6" />
                </div>
                <CardTitle>Data Privacy</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed text-sm">
              <p>
                Your privacy matters. We do not use your personal conversations or task data to train our foundational models. Data transmitted to our AI gateway is processed temporarily to generate responses and is secured in transit. We recommend avoiding entering highly sensitive personal information (like passwords or sensitive company data) into the AI prompts.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                  <Eye className="w-6 h-6" />
                </div>
                <CardTitle>Transparency</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed text-sm">
              <p>
                We believe in full transparency about when you are interacting with AI. Every AI-generated output is clearly marked within the interface. The "AI Coach" is an automated system and does not possess human emotions or consciousness, even though it is designed to be empathetic and supportive.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
