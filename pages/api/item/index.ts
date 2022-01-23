import { NextApiRequest, NextApiResponse } from "next";
import { items } from "../../../data/items";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.json(items);
  }
};

export default handler;
