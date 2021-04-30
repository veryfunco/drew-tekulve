import { ReactNode, Children } from "react";
import classnames from "classnames";

import styles from "./Stack.module.css";
import { capitalizeFirstLetter } from "lib/capitalizeFirstLetter";

interface Props {
  children: ReactNode;
  align?: "center";
  justify?: "center" | "end" | "spaceBetween";
  spacing?: "extraTight" | "tight" | "loose" | "extraLoose";
  direction?: "row" | "column";
  wrap?: boolean;
}

export function Stack({
  children,
  align,
  justify,
  spacing,
  direction = "row",
  wrap = true,
}: Props) {
  return (
    <div
      className={classnames(
        styles.Stack,
        align === "center" && styles["Stack-alignCenter"],
        justify && styles[`Stack-justify${capitalizeFirstLetter(justify)}`],
        spacing && styles[`Stack-${spacing}`],
        direction === "column" && styles["Stack-column"],
        wrap === false && styles["Stack-noWrap"]
      )}
    >
      {Children.map(children, (child) => {
        return <div className={styles.Child}>{child}</div>;
      })}
    </div>
  );
}
