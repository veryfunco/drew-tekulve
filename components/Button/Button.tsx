import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";
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
  shadow?: boolean;
}

type CommonButtonAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

/* eslint-disable react/display-name, react/prop-types */
export const Button = forwardRef<HTMLAnchorElement & HTMLButtonElement, Props>(
  (
    {
      children,
      onClick,
      wide = false,
      transparent = false,
      type = "button",
      loading,
      disabled,
      href,
      shadow,
      ...props
    },
    ref
  ) => {
    const commonProps: CommonButtonAnchorProps = {
      onClick,
      className: classnames(
        styles.Button,
        wide && styles["Button-wide"],
        transparent && styles["Button-transparent"],
        loading && styles["Button-loading"],
        shadow && styles["Button-shadow"]
      ),
    };

    if (href != null || props.as === "link") {
      return (
        <a ref={ref} {...commonProps}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} {...commonProps} type={type} disabled={disabled}>
        <div className={styles.Spinner}></div>
        <div className={styles.Content}>{children}</div>
      </button>
    );
  }
);
/* eslint-enable react/display-name, react/prop-types */
