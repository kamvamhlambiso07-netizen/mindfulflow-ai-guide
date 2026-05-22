import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Sparkles, Loader2, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: (search.redirect as string) || "/",
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw { to: search.redirect, replace: true };
    }
  },
  component: ResetPasswordPage,
});

const resetSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

function ResetPasswordPage() {
  const search = Route.useSearch();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const form = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setIsSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl mb-4 shadow-sm border border-slate-100">
            <Sparkles className="w-8 h-8 text-sky-500" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">FocusFlow AI</h1>
        </div>

        <Card className="border border-slate-100 shadow-xl shadow-slate-200/40 bg-white rounded-2xl overflow-hidden">
          <CardHeader className="space-y-1 pb-6 text-center">
            <CardTitle className="text-2xl font-bold font-heading">Reset Password</CardTitle>
            <CardDescription className="text-base text-slate-500">
              Enter your email and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSent ? (
              <div className="text-center p-4 bg-sky-50 rounded-xl mb-4 text-sky-900 border border-sky-100">
                <p className="font-medium">Check your email</p>
                <p className="text-sm mt-1 text-sky-700">We've sent a password reset link to your email address.</p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" type="email" className="h-11 bg-slate-50 border-slate-200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full h-11 text-base font-bold bg-slate-900 hover:bg-slate-800 rounded-xl mt-6" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : null}
                    Send reset link
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t border-slate-100 p-6 bg-slate-50/50">
            <Link to="/login" search={{ redirect: search.redirect }} className="flex items-center text-sm font-semibold text-sky-600 hover:text-sky-500">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}