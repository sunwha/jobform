import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
// import mail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

// mail.setApiKey(process.env.SENDGRID_KEY!);
const twilioClient = twilio(
  process.env.TWILO_ACCOUNT_SID,
  process.env.TWILO_TOKEN
);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user)
    return res.status(400).json({ ok: false, error: "No phone or email" });
  const payload = Math.floor(Math.random() * 90000 + 10000).toString();

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.My_PHONE!,
      body: `Your code is ${payload}`,
    });
    console.log(message);
  }
  // else if (email) {
  //   const email = await mail.send({
  //     from: "nico@nomadcoders.co",
  //     to: "nico@nomadcoders.co",
  //     subject: "Your Carrot Market Verification Email",
  //     text: `Your token is ${payload}`,
  //     html: `<strong>Your token is ${payload}</strong>`,
  //   });
  //   console.log(email);
  // }

  return res.json({ ok: true });
}

export default withHandler("POST", handler);
