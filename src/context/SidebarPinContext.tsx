"use client";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

type SidebarPinContextType = {
  pinned: boolean;
  togglePin: () => void;
  isLoaded: boolean;
};

const SidebarPinContext = createContext<SidebarPinContextType | undefined>(
  undefined
);

export function SidebarPinProvider({ children }: { children: ReactNode }) {
  // Start with false for server rendering
  const [pinned, setPinned] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Only run this effect on the client side
  useEffect(() => {
    // Get stored pin preference
    const storedPin = localStorage.getItem("sidebarPinned");

    // Set pin state based on storage (default to false if not found)
    if (storedPin === "true") {
      setPinned(true);
    } else {
      setPinned(false);
    }

    // Mark as loaded after setting initial state
    setIsLoaded(true);
  }, []);

  const togglePin = () => {
    setPinned((prev) => {
      const newValue = !prev;
      localStorage.setItem("sidebarPinned", newValue.toString());
      return newValue;
    });
  };

  return (
    <SidebarPinContext.Provider value={{ pinned, togglePin, isLoaded }}>
      {children}
    </SidebarPinContext.Provider>
  );
}

export function useSidebarPin() {
  const context = useContext(SidebarPinContext);
  if (context === undefined) {
    throw new Error("useSidebarPin must be used within a SidebarPinProvider");
  }
  return context;
}
