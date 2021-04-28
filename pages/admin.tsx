////////
// Convenience route that redirects to the static admin file
////////

import { useEffect } from "react";

export default function Admin() {
  useEffect(() => {
    window.location.replace(`${window.location.href}/index.html`);
  }, []);

  return null;
}
