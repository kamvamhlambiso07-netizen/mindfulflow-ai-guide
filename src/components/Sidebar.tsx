import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, CheckSquare, Mail, Bot, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/planner", label: "Task Planner", icon: CheckSquare },
  { href: "/email", label: "Smart Email", icon: Mail },
  { href: "/coach", label: "AI Coach", icon: Bot },
  { href: "/responsible-ai", label: "Ethics & Privacy", icon: ShieldAlert },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-sidebar-border bg-sidebar h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-foreground tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold font-heading text-lg">F</span>
          </div>
          FocusFlow AI
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/50 text-center">
          &copy; {new Date().getFullYear()} FocusFlow AI
        </div>
      </div>
    </aside>
  );
}
