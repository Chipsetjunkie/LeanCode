// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

type Data = {
  token: string | null;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  if (req.method === "POST") {
    const secret = process.env.NEXT_SECRET;

    const { email, password } = req.body;
    const hash = crypto
      .createHmac("sha256", secret)
      .update(email + password)
      .digest("hex");
    return res.status(201).json({ token: hash });
  }
  return res.status(201).json({ token: null });
}
