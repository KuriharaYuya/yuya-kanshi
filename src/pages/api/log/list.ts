import { NextApiRequest, NextApiResponse } from "next";
import { getLogListFromNow } from "../../../../libs/notion/logList";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getLogListFromNow();
  res.status(200).json(data);
};

export default handler;
