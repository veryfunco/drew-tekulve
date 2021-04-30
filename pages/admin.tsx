////////
// Convenience route that redirects to the static admin file
////////

import { useEffect } from "react";

import { globalProps } from "lib/data/globalProps";

export const getStaticProps = async () => {
  const global = await globalProps();
  return { props: { global } };
};

export default function Admin() {
  useEffect(() => {
    window.location.replace(`${window.location.href}/index.html`);
  }, []);

  return null;
}
