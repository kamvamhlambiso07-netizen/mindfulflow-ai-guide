import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Mail, Bot, ShieldAlert, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const features = [
  {
    title: "AI Task Planner",
    description: "Generate structured daily schedules prioritized by urgency and importance.",
    icon: CheckSquare,
    href: "/planner",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Smart Email Generator",
    description: "Draft professional emails with adaptable tones for any audience.",
    icon: Mail,
    href: "/email",
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Productivity Coach",
    description: "Overcome procrastination and focus issues with an empathetic AI coach.",
    icon: Bot,
    href: "/coach",
    color: "bg-green-100 text-green-700",
  },
];

import { useUser } from "@/contexts/UserContext";

function Dashboard() {
  const { onboardingData } = useUser();
  const firstName = "there"; // Could be extracted if we added name to onboarding

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-800 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-sky-500 mr-2 animate-pulse"></span>
            Your Personal Focus Assistant
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Welcome back, <br/> let's find your focus.
          </h1>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
            {onboardingData?.affectingProductivity 
              ? "We remember you're working on your focus. We've optimized today's tools for your goals." 
              : "Ready to focus and recover your productivity today? We've got the tools to help you succeed."}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/planner"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
            >
              Plan My Day
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/coach"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
            >
              Talk to Coach
            </Link>
          </div>
        </div>
        
        <div className="relative z-10 hidden lg:block">
          <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100 shadow-sm w-72 transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-sky-200 flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-sky-700" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 font-heading">Daily Goal</p>
                <p className="text-xs text-slate-500">From your profile</p>
              </div>
            </div>
            <p className="text-sm text-slate-700 font-medium line-clamp-3">
              "{onboardingData?.dailyGoals || 'Stay focused and complete my most important tasks today.'}"
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-heading font-bold text-slate-900 mb-6">Your Productivity Tools</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-all duration-300 border-none shadow-sm bg-white overflow-hidden group rounded-2xl h-full flex flex-col">
              <CardHeader className="pb-4 flex-1">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${feature.color}`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <CardTitle className="text-xl font-heading font-bold">{feature.title}</CardTitle>
                <CardDescription className="text-base mt-3 text-slate-600 leading-relaxed">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link
                  to={feature.href}
                  className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-sky-600 transition-colors w-full p-3 bg-slate-50 rounded-xl justify-center group-hover:bg-sky-50"
                >
                  Get started <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-slate-900 text-white border-none shadow-xl rounded-3xl mt-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <CardContent className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="bg-white/10 p-5 rounded-2xl text-white/90 backdrop-blur-sm">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold font-heading mb-3 text-white">Responsible AI Practices</h3>
            <p className="text-white/70 text-lg max-w-2xl">
              FocusFlow AI is designed to augment your capabilities, not replace human judgment. AI responses should be verified, and the app is not a replacement for professional psychological treatment.
            </p>
          </div>
          <Link
            to="/responsible-ai"
            className="inline-flex items-center justify-center rounded-full bg-white text-slate-900 px-6 py-3 text-sm font-bold hover:bg-sky-50 transition-colors whitespace-nowrap shadow-sm"
          >
            Read Ethics Policy
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
