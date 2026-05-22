import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { streamAiAction } from "@/lib/ai";
import { toast } from "sonner";
import { Send, Bot, User, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/UserContext";

export const Route = createFileRoute("/coach")({
  component: Coach,
});

type Message = { role: "user" | "assistant"; content: string };

function Coach() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! I'm your Productivity Coach. Are you struggling to focus, facing a specific challenge, or just feeling overwhelmed? Let's talk about it." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    await streamAiAction({
      action: "chat",
      payload: { messages: newMessages },
      onDelta: upsertAssistant,
      onDone: () => setIsLoading(false),
      onError: (err) => {
        toast.error(err.message);
        setIsLoading(false);
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-heading font-bold text-foreground">AI Productivity Coach</h1>
        <p className="text-muted-foreground mt-2">
          Chat with an empathetic AI assistant designed to help you overcome blocks and build healthier habits.
        </p>
      </div>

      <Card className="flex-1 flex flex-col border-none shadow-sm overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={cn(
                "flex gap-4 max-w-[85%]",
                msg.role === "user" ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-green-100 text-green-700"
              )}>
                {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={cn(
                "px-4 py-3 rounded-2xl",
                msg.role === "user" 
                  ? "bg-primary text-primary-foreground rounded-tr-sm" 
                  : "bg-slate-100 text-slate-800 rounded-tl-sm"
              )}>
                <div className="prose prose-sm max-w-none prose-p:leading-relaxed">
                  {msg.role === "user" ? (
                    <span className="whitespace-pre-wrap">{msg.content}</span>
                  ) : (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-slate-100 text-slate-800 rounded-tl-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>
        <CardFooter className="p-4 border-t bg-white">
          <div className="flex w-full gap-2 relative">
            <Textarea
              placeholder="Tell me what you're working on, or what's stopping you..."
              className="min-h-[50px] max-h-[150px] pr-12 resize-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button 
              size="icon" 
              className="absolute right-2 bottom-2 rounded-full h-8 w-8"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
