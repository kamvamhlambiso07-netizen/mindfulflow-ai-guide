import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (mounted) {
        if (error) {
          console.error("Error getting session:", error);
          setAuthState({ isAuthenticated: false, user: null, isLoading: false });
        } else {
          setAuthState({
            isAuthenticated: !!session,
            user: session?.user ?? null,
            isLoading: false,
          });
        }
      }
    }

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setAuthState({
          isAuthenticated: !!session,
          user: session?.user ?? null,
          isLoading: false,
        });
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return authState;
}