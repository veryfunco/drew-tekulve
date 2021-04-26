import classNames from "classnames";
import { ReactNode } from "react";

import styles from "./AboutPageSection.module.css";

interface Props {
  lead: string;
  children?: ReactNode;
  title?: string;
  wideLead?: boolean;
}

export function AboutPageSection({ children, title, wideLead, lead }: Props) {
  return (
    <section className={styles.Container}>
      {title == null ? null : <h3 className={styles.Title}>{title}</h3>}

      <p className={classNames(styles.Lead, wideLead && styles["Lead-wide"])}>
        {lead}
      </p>

      {children == null ? null : children}
    </section>
  );
}
