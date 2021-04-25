import { ReactNode, Children } from "react";
import styles from "./Stack.module.css";

interface Props {
  children: ReactNode;
}

export function Stack({ children }: Props) {
  return (
    <div className={styles.Stack}>
      {Children.map(children, (child) => {
        return <div className={styles.Child}>{child}</div>;
      })}
    </div>
  );
}
