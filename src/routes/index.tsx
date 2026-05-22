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

function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground">Welcome back.</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Ready to focus and recover your productivity today?
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="hover:shadow-md transition-shadow border-none shadow-sm bg-white overflow-hidden group">
            <CardHeader className="pb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
              <CardDescription className="text-base mt-2">{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                to={feature.href}
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform"
              >
                Get started <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-secondary/30 border-none shadow-sm mt-8">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-secondary p-4 rounded-full text-secondary-foreground">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold font-heading mb-2">Responsible AI Practices</h3>
            <p className="text-foreground/80">
              FocusFlow AI is designed to augment your capabilities, not replace human judgment. AI responses should be verified, and the app is not a replacement for professional psychological treatment.
            </p>
          </div>
          <Link
            to="/responsible-ai"
            className="inline-flex items-center justify-center rounded-md bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors whitespace-nowrap"
          >
            Read Ethics Policy
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
