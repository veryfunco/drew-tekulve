import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
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
  href?: string;
  as?: "link" | "button";
}

type CommonButtonAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  onClick,
  wide = false,
  transparent = false,
  type = "button",
  loading,
  disabled,
  href,
  ...props
}: Props) {
  const commonProps: CommonButtonAnchorProps = {
    onClick,
    className: classnames(
      styles.Button,
      wide && styles["Button-wide"],
      transparent && styles["Button-transparent"],
      loading && styles["Button-loading"]
    ),
  };

  if (href != null || props.as === "link") {
    return <a {...commonProps}>{children}</a>;
  }

  return (
    <button {...commonProps} type={type} disabled={disabled}>
      <div className={styles.Spinner}></div>
      <div className={styles.Content}>{children}</div>
    </button>
  );
}
