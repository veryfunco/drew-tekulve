const URL_BASE = "https://drew-tekulve.vercel.app";

export function makeAbsoluteURL(path: string) {
  const url = new URL(path, URL_BASE);

  return url.toString();
}
