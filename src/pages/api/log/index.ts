import { NextApiRequest, NextApiResponse } from "next";
import { getLogDetail } from "../../../../libs/notion/log";
import { authUser } from "../_apiAuth";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // '/api/log/ISO str' の 'ISO str' を取得する;
  if (!authUser(req, res)) {
    return;
  }
  const isoString = req.query.date;
  const data = await getLogDetail(isoString as string);
  res.status(200).json(data);
};
export default handler;
