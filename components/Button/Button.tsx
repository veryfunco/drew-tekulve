import { ButtonHTMLAttributes, ReactNode } from "react";
import classnames from "classnames";

import styles from "./Button.module.css";

interface Props {
  children: ReactNode;
  onClick?(): void;
  transparent?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  wide?: boolean;
}

export function Button({
  children,
  onClick,
  wide = false,
  transparent = false,
  type = "button",
}: Props) {
  return (
    <button
      className={classnames(
        styles.Button,
        wide && styles["Button-wide"],
        transparent && styles["Button-transparent"]
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
