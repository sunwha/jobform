import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email } = req.body;

  const isUser = await client.user.findUnique({
    where: { email },
    select: {
      id: true,
    },
  });

  if (isUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await client.user.create({
    data: {
      name,
      email,
    },
  });
  return res.status(200).json({ ok: true });
}
export default withHandler({
  method: "POST",
  handler,
  isPrivate: false,
});
