import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import withApiSession from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email } = req.body;
  const isEmail = await client.user.findUnique({
    where: { email },
    select: {
      id: true,
    },
  });
  if (isEmail) {
    req.session.user = {
      id: isEmail.id,
    };
    await req.session.save();
    return res.status(200).json({ ok: true });
  } else {
    return res.status(400).json({ ok: false });
  }
}

export default withApiSession(
  withHandler({
    method: "POST",
    handler,
    isPrivate: false,
  })
);
