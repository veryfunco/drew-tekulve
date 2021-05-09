import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { animated, useTransition } from "@react-spring/web";

import { Button } from "components/Button";
import { Navbar } from "components/Navbar";
import { Page } from "components/Page";
import { Stack } from "components/Stack";
import { StaticProps } from "types";
import { getVideoEmbedLink } from "lib/getVideoEmbedLink";

import styles from "styles/projects/Detail.module.css";
import { globalProps } from "lib/data/globalProps";
import { SEOImage } from "components/SEOImage";
import { reelPage } from "lib/data/reelPage";

export const getStaticProps = async () => {
  const global = await globalProps();

  const { reel_url, reel_cover_image, description, title } = await reelPage();

  return {
    props: {
      global,
      reelUrl: reel_url,
      reelCoverImage: reel_cover_image,
      description,
      title,
    },
  };
};

export default function ProjectDetail({
  reelUrl,
  reelCoverImage,
  description,
  title,
}: StaticProps<typeof getStaticProps>) {
  const [videoActive, setVideoActive] = useState(false);
  const transitions = useTransition(videoActive, {
    from: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.99)" },
  });

  return (
    <Page>
      <Head>
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />
        <meta
          property="twitter:description"
          content={description}
          key="twitter:description"
        />
      </Head>
      <SEOImage src={reelCoverImage} />

      <Navbar backgroundColor="black" />

      <div className={styles.HeroContainer}>
        <div className={styles.HeroInnerContainer}>
          {transitions((animatedStyles, item) =>
            item ? (
              <iframe
                src={`${getVideoEmbedLink(reelUrl)}`}
                frameBorder="0"
                allowFullScreen
                style={{ height: "100%", width: "100%" }}
              ></iframe>
            ) : (
              <animated.div
                className={styles.HeroImageContainer}
                style={animatedStyles}
              >
                <Image
                  src={reelCoverImage}
                  layout="fill"
                  className={styles.PreviewImage}
                  alt=""
                />
                <div className={styles.PlayButtonContainer}>
                  <Button wide onClick={() => setVideoActive(true)}>
                    Play
                  </Button>
                </div>
              </animated.div>
            )
          )}
        </div>
      </div>

      <div className={styles.DetailsContainer}>
        <Stack spacing="extraLoose" direction="column" align="center">
          <Stack spacing="extraTight" direction="column">
            <h2 className={styles.Title}>{title}</h2>
          </Stack>

          <p className={styles.Description}>{description}</p>
        </Stack>
      </div>
    </Page>
  );
}
