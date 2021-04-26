import { InferGetStaticPropsType } from "next";
import { AboutPageSection } from "../components/AboutPageSection";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { Page } from "../components/Page";
import { Stack } from "../components/Stack";
import { TextField } from "../components/TextField";
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

      <AboutPageSection
        wideLead
        lead="Everything from TV shows and commercials to feature films that have screened at Sundance Film Festival. Working primarily in DaVinci Resolve, with experience in HDR and ACES workflows."
      />

      <AboutPageSection
        title="Clients"
        lead="Want to work together? Describe your project below and I’ll send you a quote."
      >
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
      </AboutPageSection>

      <AboutPageSection
        title="Contact"
        lead="Want to work together? Describe your project below and I’ll send you a quote."
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className={styles.ContactForm}
        >
          <Stack direction="column" spacing="tight" justify="center">
            <TextField
              placeholder="Name"
              value=""
              onChange={(value) => console.log(value)}
            />
            <TextField
              placeholder="Email"
              value=""
              onChange={(value) => console.log(value)}
            />
            <TextField
              placeholder="Subject"
              value=""
              onChange={(value) => console.log(value)}
            />
            <TextField
              placeholder="Message"
              multiline
              value=""
              onChange={(value) => console.log(value)}
            />
            <Button type="submit" wide>
              Send
            </Button>
          </Stack>
        </form>
      </AboutPageSection>
    </Page>
  );
}
