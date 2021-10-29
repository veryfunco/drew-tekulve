import styles from "./StillsViewer.module.css";

interface Props {
  stills: { image: string }[];
  projectName: string;
}

export function StillsViewer({ stills, projectName }: Props) {
  return (
    <div className={styles.Container}>
      {stills.slice(0, 3).map(({ image }) => (
        <div key={image} className={styles.ImageContainer}>
          <img
            className={styles.Image}
            src={image}
            alt={`Image from ${projectName}`}
          />
        </div>
      ))}
    </div>
  );
}
