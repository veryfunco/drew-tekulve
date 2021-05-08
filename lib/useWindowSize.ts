import { useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize | null>(
    typeof window === "undefined"
      ? null
      : {
          width: window.innerWidth,
          height: window.innerHeight,
        }
  );

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.screen.width,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
