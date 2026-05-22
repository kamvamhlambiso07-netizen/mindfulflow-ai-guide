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
import { Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const Route = createFileRoute("/planner")({
  component: Planner,
});

function Planner() {
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
      payload: { task, priority, duration },
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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">AI Task Planner</h1>
        <p className="text-muted-foreground mt-2">
          Enter what you need to do, and our AI will break it down into manageable steps with focus techniques.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
        <Card className="md:col-span-5 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
            <CardDescription>Tell us about the task</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                variant="link" 
                className="text-primary hover:underline text-left"
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
