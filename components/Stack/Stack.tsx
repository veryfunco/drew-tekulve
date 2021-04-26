import { ReactNode, Children } from "react";
import classnames from "classnames";

import styles from "./Stack.module.css";

interface Props {
  children: ReactNode;
  align?: "center";
  justify?: "center" | "end";
  spacing?: "tight" | "extraTight" | "loose";
  direction?: "row" | "column";
}

export function Stack({
  children,
  align,
  justify,
  spacing,
  direction = "row",
}: Props) {
  return (
    <div
      className={classnames(
        styles.Stack,
        align === "center" && styles["Stack-alignCenter"],
        justify === "center" && styles["Stack-justifyCenter"],
        justify === "end" && styles["Stack-justifyEnd"],
        spacing && styles[`Stack-${spacing}`],
        direction === "column" && styles["Stack-column"]
      )}
    >
      {Children.map(children, (child) => {
        return <div className={styles.Child}>{child}</div>;
      })}
    </div>
  );
}
