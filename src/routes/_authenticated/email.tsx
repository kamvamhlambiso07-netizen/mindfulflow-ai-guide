import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { streamAiAction } from "@/lib/ai";
import { toast } from "sonner";
import { Loader2, Sparkles, Copy, CheckCircle2, Mail } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

export const Route = createFileRoute("/_authenticated/email")({
  component: EmailGenerator,
});

function EmailGenerator() {
  const { onboardingData } = useUser();
  const [audience, setAudience] = useState("manager");
  const [tone, setTone] = useState("professional");
  const [context, setContext] = useState("");
  const [emailOutput, setEmailOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateEmail = async () => {
    if (!context.trim()) {
      toast.error("Please provide some context for the email");
      return;
    }

    setIsLoading(true);
    setEmailOutput("");

    await streamAiAction({
      action: "email",
      payload: { 
        audience, 
        tone, 
        context,
        userContext: onboardingData
      },
      onDelta: (chunk) => {
        setEmailOutput((prev) => prev + chunk);
      },
      onDone: () => {
        setIsLoading(false);
      },
      onError: (err) => {
        toast.error(err.message);
        setIsLoading(false);
      },
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(emailOutput);
    setCopied(true);
    toast.success("Email copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-12">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-sm font-medium text-purple-800 mb-4">
            <Mail className="w-4 h-4 mr-2 text-purple-500" />
            Smart Email Generator
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">Draft Perfect Emails</h1>
          <p className="text-slate-600 mt-2 text-lg max-w-2xl">
            Struggling with what to say? Let AI draft a perfect email tailored to your audience and tone.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-5 border border-slate-100 shadow-md rounded-2xl overflow-hidden bg-white">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6">
            <CardTitle className="font-heading text-xl">Email Context</CardTitle>
            <CardDescription className="text-base">Who are you writing to and why?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="audience">Audience</Label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger id="audience" className="bg-white">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager / Supervisor</SelectItem>
                  <SelectItem value="team">Team / Colleagues</SelectItem>
                  <SelectItem value="client">Client / Customer</SelectItem>
                  <SelectItem value="professor">Professor / Teacher</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone" className="bg-white">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal & Polite</SelectItem>
                  <SelectItem value="professional">Professional & Direct</SelectItem>
                  <SelectItem value="informal">Informal & Friendly</SelectItem>
                  <SelectItem value="persuasive">Persuasive & Confident</SelectItem>
                  <SelectItem value="apologetic">Apologetic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="context">Key Points / Context</Label>
              <Textarea
                id="context"
                placeholder="e.g., Requesting a deadline extension for the Q3 report until Friday due to unexpected data discrepancies."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="resize-none h-32 bg-white"
              />
            </div>

            <Button 
              onClick={handleGenerateEmail} 
              disabled={isLoading || !context.trim()} 
              className="w-full mt-4"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Drafting Email...</>
              ) : (
                <><Sparkles className="w-4 h-4 mr-2" /> Draft Email</>
              )}
            </Button>
            
            <div className="pt-4 text-sm text-muted-foreground">
              <p className="font-medium mb-1">Example prompt:</p>
              <button 
                className="text-primary hover:underline text-left bg-transparent border-none p-0 cursor-pointer"
                onClick={() => {
                  setContext("I need to ask for a 2-day extension on the final project. I've been sick the past few days.");
                  setAudience("professor");
                  setTone("formal");
                }}
              >
                "Ask for a 2-day extension on the final project..."
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-7 border-none shadow-sm flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Generated Email</CardTitle>
              <CardDescription>Edit output below before sending</CardDescription>
            </div>
            {emailOutput && (
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            )}
          </CardHeader>
          <CardContent className="flex-1 pb-6">
            {emailOutput || isLoading ? (
              <Textarea
                className="w-full h-full min-h-[350px] resize-none border-none bg-slate-50/50 p-4 focus-visible:ring-1"
                value={emailOutput}
                onChange={(e) => setEmailOutput(e.target.value)}
              />
            ) : (
              <div className="h-full min-h-[350px] bg-slate-50/50 rounded-md flex flex-col items-center justify-center text-muted-foreground text-center p-6">
                <Mail className="w-12 h-12 mb-4 text-muted-foreground/30" />
                <p>Your generated email will appear here.</p>
                <p className="text-sm">You'll be able to edit it directly before copying.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
