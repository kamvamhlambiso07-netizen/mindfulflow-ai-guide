import React, { createContext, useContext, useEffect, useState } from "react";

export type OnboardingData = {
  affectingProductivity: string;
  strugglingHabits: string[];
  dailyGoals: string;
  struggleTime: string[];
};

type UserContextType = {
  onboardingData: OnboardingData | null;
  setOnboardingData: (data: OnboardingData) => void;
  isOnboardingComplete: boolean;
  clearOnboarding: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [onboardingData, setOnboardingDataState] = useState<OnboardingData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("focusflow_onboarding");
    if (stored) {
      try {
        setOnboardingDataState(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse onboarding data");
      }
    }
    setIsLoaded(true);
  }, []);

  const setOnboardingData = (data: OnboardingData) => {
    setOnboardingDataState(data);
    localStorage.setItem("focusflow_onboarding", JSON.stringify(data));
  };

  const clearOnboarding = () => {
    setOnboardingDataState(null);
    localStorage.removeItem("focusflow_onboarding");
  };

  if (!isLoaded) return null;

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
