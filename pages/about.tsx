import { InferGetStaticPropsType } from "next";
import { FormEvent, useState } from "react";
import { AboutPageSection } from "../components/AboutPageSection";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { Page } from "../components/Page";
import { Stack } from "../components/Stack";
import { TextField } from "../components/TextField";
import { aboutPage } from "../lib/data/aboutPage";

import styles from "../styles/About.module.css";

export const getStaticProps = async () => {
  const { clients } = await aboutPage();

  return {
    props: {
      clients,
    },
  };
};

export default function About(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormState("loading");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        subject,
      }),
    });

    if (response.status === 200) {
      setFormState("success");
    } else {
      setFormState("error");
    }
  }

  return (
    <Page title="About" background="blue">
      <Navbar hideLogo backgroundColor="blue" />

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
                <img key={client.name} alt={client.name} src={client.logo} />
              </div>
            ))}
          </Stack>
        </div>
      </AboutPageSection>

      <AboutPageSection
        title="Contact"
        lead="Want to work together? Describe your project below and I’ll send you a quote."
      >
        <form onSubmit={handleFormSubmit} className={styles.ContactForm}>
          <Stack direction="column" spacing="tight" justify="center">
            <TextField placeholder="Name" value={name} onChange={setName} />

            <TextField placeholder="Email" value={email} onChange={setEmail} />

            <TextField
              placeholder="Subject"
              value={subject}
              onChange={setSubject}
            />

            <TextField
              placeholder="Message"
              multiline
              value={message}
              onChange={setMessage}
            />

            <Button
              type="submit"
              wide
              disabled={formState === "loading"}
              loading={formState === "loading"}
            >
              Send
            </Button>

            {formState === "success" ? (
              <p>Email sent! I'll get back to you soon.</p>
            ) : formState === "error" ? (
              <p>Uh oh...something went wrong. Try again later.</p>
            ) : null}
          </Stack>
        </form>
      </AboutPageSection>
    </Page>
  );
}
