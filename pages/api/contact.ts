import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

import { sleep } from "../../lib/sleep";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(404);
    return;
  }

  if (req.body.testing) {
    await sleep(1000);

    res
      .status(req.body.fail ? 500 : 200)
      .json(req.body.fail ? { error: "uhh" } : {});

    return;
  }

  const { name, email, subject, message } = req.body;

  try {
    await sgMail.send({
      to:
        process.env.NODE_ENV === "production"
          ? "drew@drewtekulve.com"
          : "asmockler@gmail.com",
      from: "asmockler@gmail.com",
      subject: `\\(^ヮ^)/ Contact form submission: ${subject}`,
      html: `
        <h1 style="font-family: sans-serif; font-size: 20px;">∠( ᐛ 」∠)_ Someone filled out your contact form!</h1>
        <p style="font-family: sans-serif"><strong>Name</strong>: ${name}</p>
        <p style="font-family: sans-serif"><strong>Email</strong>: ${email}</p>
        <p style="font-family: sans-serif"><strong>Message</strong>: ${message}</p>
      `,
    });
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error });
  }
};
