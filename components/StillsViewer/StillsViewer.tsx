import styles from "./StillsViewer.module.css";

interface Props {
  stills: { image: string }[];
}

export function StillsViewer({ stills }: Props) {
  return (
    <div className={styles.Container}>
      {stills.slice(0, 3).map(({ image }) => (
        <div key={image} className={styles.ImageContainer}>
          <img className={styles.Image} src={image} />
        </div>
      ))}
    </div>
  );
}
