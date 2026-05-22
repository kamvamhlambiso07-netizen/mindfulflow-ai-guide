import { Sidebar } from "./Sidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto">
        <div className="container mx-auto p-6 md:p-8 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
