import { useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize() {
  const initialState =
    typeof window === "undefined"
      ? null
      : { width: window.innerWidth, height: window.innerHeight };

  const [windowSize, setWindowSize] = useState<WindowSize | null>(initialState);

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
