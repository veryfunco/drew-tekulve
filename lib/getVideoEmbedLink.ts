interface Params {
  [key: string]: string;
}

export function getVideoEmbedLink(videoUrl: string, params: Params = {}) {
  const url = new URL(videoUrl);

  if (url.host.includes("youtube")) {
    const videoId = url.searchParams.get("v");
    const urlParams = new URLSearchParams({
      autoplay: "1",
      modestbranding: "1",
      ...params,
    });
    return `https://youtube.com/embed/${videoId}?${urlParams}`;
  } else if (url.host.includes("vimeo")) {
    const videoId = url.pathname.split("/")[1];
    const urlParams = new URLSearchParams({
      autoplay: "1",
      modestbranding: "1",
      ...params,
    });
    return `https://player.vimeo.com/video/${videoId}?${urlParams}`;
  } else {
    throw new Error(`Unrecognized video url host: ${url.host}`);
  }
}
