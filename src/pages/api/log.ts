import { NextApiRequest, NextApiResponse } from "next";
import { getLogDetail } from "../../../libs/notion";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // '/api/log/ISO str' の 'ISO str' を取得する;
  const isoString = req.query.date;
  const data = await getLogDetail(isoString);
  res.status(200).json(data);
};
export default handler;
