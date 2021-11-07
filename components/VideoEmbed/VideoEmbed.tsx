import { useState } from "react";
import Image from "next/image";
import { animated, useTransition } from "@react-spring/web";

import { Button } from "components/Button";
import { getVideoEmbedLink } from "lib/getVideoEmbedLink";

import styles from "./VideoEmbed.module.css";

interface Props {
  videoUrl?: string;
  coverImageUrl: string;
}

export function VideoEmbed({ videoUrl, coverImageUrl }: Props) {
  const [videoActive, setVideoActive] = useState(false);
  const transitions = useTransition(videoActive, {
    from: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.99)" },
  });

  return (
    <div className={styles.Container}>
      {transitions((animatedStyles, item) =>
        item ? (
          <iframe
            src={`${getVideoEmbedLink(videoUrl)}`}
            frameBorder="0"
            allowFullScreen
            style={{ height: "100%", width: "100%" }}
          ></iframe>
        ) : (
          <animated.div
            className={styles.ImageContainer}
            style={animatedStyles}
          >
            <Image
              src={coverImageUrl}
              layout="fill"
              className={styles.Image}
              alt=""
            />
            <div className={styles.PlayButtonContainer}>
              {videoUrl == null ? null : (
                <Button onClick={() => setVideoActive(true)} shadow wide>
                  Play
                </Button>
              )}
            </div>
          </animated.div>
        )
      )}
    </div>
  );
}
