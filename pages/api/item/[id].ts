import { NextApiRequest, NextApiResponse } from "next";
import { items } from "../../../data/items";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const id = req.query.id;
    res.json(items.find((item) => item.id === id));
  }
};

export default handler;
