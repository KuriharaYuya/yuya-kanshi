import { NextApiRequest, NextApiResponse } from "next";
import { authUser } from "../_apiAuth";
import appendContents from "../../../services/actions/notion/appendContents";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const tgtDate = req.query.date as string;

  await appendContents(tgtDate);
  return res.status(200).json({ message: "success" });
};

export default handler;
