import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

export type OnboardingData = {
  affectingProductivity: string;
  strugglingHabits: string[];
  dailyGoals: string;
  struggleTime: string[];
};

type UserContextType = {
  onboardingData: OnboardingData | null;
  setOnboardingData: (data: OnboardingData) => Promise<void>;
  isOnboardingComplete: boolean;
  clearOnboarding: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [onboardingData, setOnboardingDataState] = useState<OnboardingData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (isAuthenticated && user) {
        // Fetch from Supabase
        const { data, error } = await supabase
          .from("profiles")
          .select("onboarding_data")
          .eq("id", user.id)
          .single();
          
        if (!error && data?.onboarding_data) {
          setOnboardingDataState(data.onboarding_data as unknown as OnboardingData);
        } else {
          setOnboardingDataState(null);
        }
      } else {
        // Fallback to local storage (e.g. if we decide to allow unauth again)
        const stored = localStorage.getItem("focusflow_onboarding");
        if (stored) {
          try {
            setOnboardingDataState(JSON.parse(stored));
          } catch (e) {
            console.error("Failed to parse onboarding data");
          }
        }
      }
      setIsLoaded(true);
    }

    if (!isAuthLoading) {
      loadData();
    }
  }, [isAuthenticated, user, isAuthLoading]);

  const setOnboardingData = async (data: OnboardingData) => {
    setOnboardingDataState(data);
    
    if (isAuthenticated && user) {
      await supabase
        .from("profiles")
        .update({ onboarding_data: data as any })
        .eq("id", user.id);
    } else {
      localStorage.setItem("focusflow_onboarding", JSON.stringify(data));
    }
  };

  const clearOnboarding = async () => {
    setOnboardingDataState(null);
    
    if (isAuthenticated && user) {
      await supabase
        .from("profiles")
        .update({ onboarding_data: null })
        .eq("id", user.id);
    } else {
      localStorage.removeItem("focusflow_onboarding");
    }
  };

  if (isAuthLoading || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        onboardingData,
        setOnboardingData,
        isOnboardingComplete: !!onboardingData,
        clearOnboarding,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
