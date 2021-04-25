import { ReactNode } from "react";
import classnames from "classnames";

import styles from "./Button.module.css";

interface Props {
  children: ReactNode;
  onClick(): void;
  transparent?: boolean;
  wide?: boolean;
}

export function Button({
  children,
  onClick,
  wide = false,
  transparent = false,
}: Props) {
  return (
    <button
      className={classnames(
        styles.Button,
        wide && styles["Button-wide"],
        transparent && styles["Button-transparent"]
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
