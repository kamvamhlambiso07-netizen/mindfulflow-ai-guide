import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { streamAiAction } from "@/lib/ai";
import { toast } from "sonner";
import { Loader2, Sparkles, CheckSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useUser } from "@/contexts/UserContext";

export const Route = createFileRoute("/_authenticated/planner")({
  component: Planner,
});

function Planner() {
  const { onboardingData } = useUser();
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [duration, setDuration] = useState("60");
  const [plan, setPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePlan = async () => {
    if (!task.trim()) {
      toast.error("Please enter a task description");
      return;
    }

    setIsLoading(true);
    setPlan("");

    await streamAiAction({
      action: "plan",
      payload: { 
        task, 
        priority, 
        duration,
        userContext: onboardingData
      },
      onDelta: (chunk) => {
        setPlan((prev) => prev + chunk);
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

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-12">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-800 mb-4">
            <Sparkles className="w-4 h-4 mr-2 text-sky-500" />
            AI Task Planner
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">Structured Focus</h1>
          <p className="text-slate-600 mt-2 text-lg max-w-2xl">
            Enter what you need to do, and our AI will break it down into manageable steps with focus techniques.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-5 border border-slate-100 shadow-md rounded-2xl overflow-hidden bg-white">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6">
            <CardTitle className="font-heading text-xl">Task Details</CardTitle>
            <CardDescription className="text-base">Tell us about the task at hand</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="task">Task Description</Label>
              <Textarea
                id="task"
                placeholder="e.g., Write the first draft of the Q3 marketing report..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="resize-none h-24 bg-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger id="priority" className="bg-white">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Nice to have</SelectItem>
                  <SelectItem value="medium">Medium - Should do</SelectItem>
                  <SelectItem value="high">High - Important</SelectItem>
                  <SelectItem value="urgent">Urgent - Must do now</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Available Time (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="15"
                step="15"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="bg-white"
              />
            </div>

            <Button 
              onClick={handleGeneratePlan} 
              disabled={isLoading || !task.trim()} 
              className="w-full mt-4"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating Plan...</>
              ) : (
                <><Sparkles className="w-4 h-4 mr-2" /> Generate Schedule</>
              )}
            </Button>
            
            <div className="pt-4 text-sm text-muted-foreground">
              <p className="font-medium mb-1">Try this placeholder:</p>
              <button 
                className="text-primary hover:underline text-left bg-transparent border-none p-0 cursor-pointer"
                onClick={() => {
                  setTask("Study for upcoming Biology mid-term covering chapters 4-7");
                  setPriority("high");
                  setDuration("120");
                }}
              >
                "Study for upcoming Biology mid-term covering chapters 4-7"
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-7 border-none shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle>Structured Schedule</CardTitle>
            <CardDescription>Your optimized AI-generated plan</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 bg-slate-50/50 m-6 mt-0 rounded-lg p-6 overflow-auto">
            {plan ? (
              <div className="prose prose-sm md:prose-base max-w-none text-foreground prose-headings:font-heading prose-headings:font-semibold">
                <ReactMarkdown>{plan}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-muted-foreground text-center">
                <CheckSquare className="w-12 h-12 mb-4 text-muted-foreground/30" />
                <p>Your structured schedule will appear here.</p>
                <p className="text-sm">Fill out the details and click generate.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
