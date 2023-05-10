import { NextApiRequest, NextApiResponse } from "next";
import { getLogListFromNow } from "../../../../libs/notion/logList";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const onlyPubLish = req.query.onlyPubLish === "true" ? true : false;
  const data = await getLogListFromNow(onlyPubLish);
  res.status(200).json(data);
};

export default handler;
