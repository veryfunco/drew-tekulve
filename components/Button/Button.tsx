import { ButtonHTMLAttributes, ReactNode } from "react";
import classnames from "classnames";

import styles from "./Button.module.css";

interface Props {
  children: ReactNode;
  onClick?(): void;
  transparent?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  wide?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  wide = false,
  transparent = false,
  type = "button",
  loading,
  disabled,
}: Props) {
  return (
    <button
      className={classnames(
        styles.Button,
        wide && styles["Button-wide"],
        transparent && styles["Button-transparent"],
        loading && styles["Button-loading"]
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <div className={styles.Spinner}></div>
      <div className={styles.Content}>{children}</div>
    </button>
  );
}
