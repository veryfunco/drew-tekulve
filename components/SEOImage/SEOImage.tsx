import { makeAbsoluteURL } from "lib/makeAbsoluteURL";
import Head from "next/head";

interface Props {
  src: string;
}

export function SEOImage({ src }: Props) {
  const imageUrl = makeAbsoluteURL(src);

  return (
    <Head>
      <meta property="og:image" content={imageUrl} key="og:image" />
      <meta name="twitter:image" content={imageUrl} key="twitter:image" />
    </Head>
  );
}
