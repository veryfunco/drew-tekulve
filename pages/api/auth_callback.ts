import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        client_id: process.env.GITHUB_CMS_CLIENT_ID,
        client_secret: process.env.GITHUB_CMS_CLIENT_SECRET,
      }),
    }
  );

  const { access_token } = await tokenResponse.json();

  const message = {
    token: access_token,
    provider: "github",
  };

  res.status(200).send(`
    <script>
      (function () {
        function receiveMessage(event) {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify(message)}',
            event.origin,
          );
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
  `);
};
