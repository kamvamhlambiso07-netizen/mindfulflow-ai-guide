import { Sidebar } from "./Sidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto">
        <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
