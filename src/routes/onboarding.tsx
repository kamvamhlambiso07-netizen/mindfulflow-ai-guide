import { createFileRoute, useNavigate, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { useUser, OnboardingData } from "@/contexts/UserContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

const HABIT_OPTIONS = [
  "Procrastination",
  "Digital Distractions (Social media, phone)",
  "Lack of focus/concentration",
  "Burnout/Overwhelm",
  "Poor time management",
  "Perfectionism",
];

const TIME_OPTIONS = [
  "Early Morning",
  "Mid-day",
  "Afternoon slumps",
  "Evening",
  "Late Night",
];

function OnboardingPage() {
  const { setOnboardingData, isOnboardingComplete } = useUser();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<OnboardingData>>({
    affectingProductivity: "",
    strugglingHabits: [],
    dailyGoals: "",
    struggleTime: [],
  });

  if (isOnboardingComplete) {
    return <Navigate to="/" />;
  }

  const handleNext = () => {
    if (step === 1 && !data.affectingProductivity?.trim()) {
      toast.error("Please tell us what's affecting your productivity.");
      return;
    }
    if (step === 2 && (!data.strugglingHabits || data.strugglingHabits.length === 0)) {
      toast.error("Please select at least one habit.");
      return;
    }
    if (step === 3 && !data.dailyGoals?.trim()) {
      toast.error("Please define your daily goals.");
      return;
    }
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      if (!data.struggleTime || data.struggleTime.length === 0) {
        toast.error("Please select when you struggle the most.");
        return;
      }
      
      // Save and finish
      setOnboardingData(data as OnboardingData);
      toast.success("Profile setup complete! Welcome to FocusFlow.");
      navigate({ to: "/" });
    }
  };

  const toggleHabit = (habit: string) => {
    setData((prev) => {
      const current = prev.strugglingHabits || [];
      return {
        ...prev,
        strugglingHabits: current.includes(habit)
          ? current.filter((h) => h !== habit)
          : [...current, habit],
      };
    });
  };

  const toggleTime = (time: string) => {
    setData((prev) => {
      const current = prev.struggleTime || [];
      return {
        ...prev,
        struggleTime: current.includes(time)
          ? current.filter((t) => t !== time)
          : [...current, time],
      };
    });
  };

  return (
    <div className="min-h-screen bg-sky-50/50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl mb-6 shadow-sm border border-sky-100">
            <Sparkles className="w-8 h-8 text-sky-500" />
          </div>
          <h1 className="text-4xl font-heading font-bold mb-3 text-slate-900">Let's Personalize Your Experience</h1>
          <p className="text-slate-600 text-lg">
            Help the AI understand your unique productivity challenges.
          </p>
        </div>

        <Card className="border-none shadow-xl shadow-sky-100/50 bg-white">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between mb-4">
              <CardDescription className="font-medium text-sky-600 uppercase tracking-wider text-xs">Step {step} of 4</CardDescription>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${step >= i ? "bg-sky-500" : "bg-sky-100"}`} />
                ))}
              </div>
            </div>
            <CardTitle className="text-2xl font-heading">
              {step === 1 && "What is currently affecting your productivity?"}
              {step === 2 && "What habits are you struggling with?"}
              {step === 3 && "What are your main daily goals?"}
              {step === 4 && "When do you struggle most with focus?"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <Textarea
                  placeholder="E.g., I have too many meetings, I get easily distracted, or I feel overwhelmed by my workload..."
                  className="min-h-[140px] text-base p-4 resize-none bg-slate-50 border-slate-200 focus-visible:ring-sky-500"
                  value={data.affectingProductivity}
                  onChange={(e) => setData({ ...data, affectingProductivity: e.target.value })}
                />
              </div>
            )}
            
            {step === 2 && (
              <div className="grid sm:grid-cols-2 gap-4">
                {HABIT_OPTIONS.map((habit) => (
                  <label
                    key={habit}
                    className={`flex items-start space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      data.strugglingHabits?.includes(habit) 
                        ? "border-sky-500 bg-sky-50" 
                        : "border-slate-100 hover:border-sky-200"
                    }`}
                  >
                    <Checkbox 
                      checked={data.strugglingHabits?.includes(habit)}
                      onCheckedChange={() => toggleHabit(habit)}
                      className="mt-0.5 border-sky-500 data-[state=checked]:bg-sky-500"
                    />
                    <span className="text-sm font-medium leading-tight text-slate-800">{habit}</span>
                  </label>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <Textarea
                  placeholder="E.g., I want to finish my daily tasks by 5 PM, write 1000 words a day, or just be more organized..."
                  className="min-h-[140px] text-base p-4 resize-none bg-slate-50 border-slate-200 focus-visible:ring-sky-500"
                  value={data.dailyGoals}
                  onChange={(e) => setData({ ...data, dailyGoals: e.target.value })}
                />
              </div>
            )}

            {step === 4 && (
              <div className="grid sm:grid-cols-2 gap-4">
                {TIME_OPTIONS.map((time) => (
                  <label
                    key={time}
                    className={`flex items-start space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      data.struggleTime?.includes(time) 
                        ? "border-sky-500 bg-sky-50" 
                        : "border-slate-100 hover:border-sky-200"
                    }`}
                  >
                    <Checkbox 
                      checked={data.struggleTime?.includes(time)}
                      onCheckedChange={() => toggleTime(time)}
                      className="mt-0.5 border-sky-500 data-[state=checked]:bg-sky-500"
                    />
                    <span className="text-sm font-medium leading-tight text-slate-800">{time}</span>
                  </label>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6 mt-4">
            <Button 
              variant="ghost" 
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="text-slate-500 hover:text-slate-800"
            >
              Back
            </Button>
            <Button onClick={handleNext} className="min-w-[140px] rounded-full bg-slate-900 text-white hover:bg-slate-800">
              {step === 4 ? "Complete Setup" : "Continue"}
              {step !== 4 && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
