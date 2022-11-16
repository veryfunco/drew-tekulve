import { useEffect, useState } from "react";
import Link from "next/link";
import { useSpring, animated } from "@react-spring/web";
import { useWindowSize } from "lib/useWindowSize";

import styles from "./ScrollyLogo.module.css";

interface Props {
  scrollAmount: number;
}

export function ScrollyLogo({ scrollAmount }: Props) {
  const windowSize = useWindowSize();
  const [isFirstRender, setIsFirstRender] = useState(true);

  const windowHeight = windowSize == null ? 0 : windowSize.height;
  const animatedStyles = useSpring({
    from: { width: 550, y: windowHeight / 3 },
    width: 150 + 400 * scrollAmount,
    y: Math.max((windowHeight / 3) * scrollAmount, 12),
    immediate: isFirstRender,
    duration: 50,
  });

  useEffect(() => {
    setIsFirstRender(windowSize == null);
  }, [windowSize, scrollAmount]);

  return (
    <animated.div
      style={{
        x: "-50%",
        y: animatedStyles.y,
      }}
      className={styles.Container}
    >
      <Link href="/">
        <animated.img
          src="/images/logo.svg"
          style={{
            width: animatedStyles.width,
            maxWidth: "85vw",
          }}
        />
      </Link>
    </animated.div>
  );
}
