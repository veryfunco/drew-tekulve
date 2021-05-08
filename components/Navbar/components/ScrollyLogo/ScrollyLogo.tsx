import React from "react";
import Link from "next/link";
import { useSpring, animated } from "@react-spring/web";
import { useWindowSize } from "lib/useWindowSize";

import styles from "./ScrollyLogo.module.css";

interface Props {
  scrollAmount: number;
}

export function ScrollyLogo({ scrollAmount }: Props) {
  const windowSize = useWindowSize();

  const windowHeight = windowSize == null ? 60 : windowSize.height;
  const animatedStyles = useSpring({
    from: { width: 550, y: windowHeight / 3 },
    width: 150 + 400 * scrollAmount,
    y: Math.max((windowHeight / 3) * scrollAmount, 12),
    immediate: true,
  });

  return (
    <animated.div
      style={{
        x: "-50%",
        y: animatedStyles.y,
      }}
      className={styles.Container}
    >
      <Link href="/">
        <a>
          <animated.img
            src="/images/logo.svg"
            style={{
              width: animatedStyles.width,
              maxWidth: "85vw",
            }}
          />
        </a>
      </Link>
    </animated.div>
  );
}
