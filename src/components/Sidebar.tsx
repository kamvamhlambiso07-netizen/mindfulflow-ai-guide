import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, CheckSquare, Mail, Bot, ShieldAlert, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/planner", label: "Task Planner", icon: CheckSquare },
  { href: "/email", label: "Smart Email", icon: Mail },
  { href: "/coach", label: "AI Coach", icon: Bot },
  { href: "/responsible-ai", label: "Ethics", icon: ShieldAlert },
  { href: "/project-details", label: "Project Details", icon: FileText },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-sidebar-border bg-sidebar md:h-full flex flex-col">
      <div className="p-4 md:p-6 flex items-center justify-between md:justify-start">
        <h1 className="text-xl md:text-2xl font-bold text-primary-foreground tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold font-heading text-lg">F</span>
          </div>
          <span className="hidden md:inline">FocusFlow AI</span>
        </h1>
      </div>
      <nav className="flex-1 px-4 py-2 md:py-0 flex md:flex-col gap-2 overflow-x-auto no-scrollbar items-center md:items-stretch">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-2 md:gap-3 px-3 py-2 md:py-2.5 rounded-md transition-colors text-sm font-medium whitespace-nowrap",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="w-4 h-4 md:w-5 md:h-5" />
              <span className="md:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="hidden md:block p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/50 text-center">
          &copy; {new Date().getFullYear()} FocusFlow AI
        </div>
      </div>
    </aside>
  );
}
