import { InferGetStaticPropsType } from "next";
import { Navbar } from "../components/Navbar";
import { Page } from "../components/Page";
import { Stack } from "../components/Stack";
import { aboutData } from "../lib/api/about";

import styles from "../styles/About.module.css";

export const getStaticProps = async () => {
  const { aboutPageCollection } = await aboutData();

  const aboutPage = aboutPageCollection.items[0];

  return {
    props: {
      clients: aboutPage.clientsCollection.items,
    },
  };
};

export default function About(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Page title="About" background="blue">
      <Navbar />

      <div className={styles.HeroContainer}>
        <img className={styles.Logo} src="/images/logo.svg" />
      </div>

      <div className={styles.ContentContainer}>
        <p className={styles.Description}>
          Everything from TV shows and commercials to feature films that have
          screened at Sundance Film Festival. Working primarily in DaVinci
          Resolve, with experience in HDR and ACES workflows.
        </p>

        <div className={styles.ClientsContainer}>
          <h3 className={styles.ClientsTitle}>Clients</h3>
          <p className={styles.ClientsLead}>
            Want to work together? Describe your project below and I’ll send you
            a quote.
          </p>

          <div className={styles.ClientLogosContainer}>
            <Stack align="center" justify="center" spacing="loose">
              {props.clients.map((client) => (
                <div key={client.name}>
                  <img
                    key={client.name}
                    alt={client.name}
                    src={client.logo.url}
                  />
                </div>
              ))}
            </Stack>
          </div>
        </div>
      </div>
    </Page>
  );
}
