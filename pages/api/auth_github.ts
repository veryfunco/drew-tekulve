import type { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const params = querystring.stringify({
    client_id: process.env.GITHUB_CMS_CLIENT_ID,
    scope: "repo",
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
};
