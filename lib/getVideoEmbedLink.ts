export function getVideoEmbedLink(videoUrl: string) {
  const url = new URL(videoUrl);

  if (url.host.includes("youtube")) {
    const videoId = url.searchParams.get("v");
    return `https://youtube.com/embed/${videoId}?autoplay=1&modestbranding=1`;
  } else if (url.host.includes("vimeo")) {
    const videoId = url.pathname.split("/")[1];
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  } else {
    throw new Error(`Unrecognized video url host: ${url.host}`);
  }
}
