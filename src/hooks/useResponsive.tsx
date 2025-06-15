"use client";
import { useState, useEffect } from "react";

export function useResponsive() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Set initial width
    handleResize();
    setIsLoaded(true);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Only determine view after width is loaded
  const mobileView = isLoaded && windowWidth !== null && windowWidth < 768;
  const desktopView = isLoaded && windowWidth !== null && windowWidth >= 768;

  return {
    mobileView,
    desktopView,
    windowWidth,
    isLoaded,
  };
}
