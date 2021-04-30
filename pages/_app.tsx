import "styles/globals.css";
import { AppProps } from "next/app";

import { AppContextProvider } from "lib/AppContext";

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.global == null) {
    throw new Error(`Global page props must be defined for all pages`);
  }

  return (
    <AppContextProvider value={{ ...pageProps.global }}>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;
