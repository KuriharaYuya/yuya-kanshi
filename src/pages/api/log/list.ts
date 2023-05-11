import { NextApiRequest, NextApiResponse } from "next";
import { getLogListFromNow } from "../../../../libs/notion/logList";
import { authUser } from "../_apiAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!authUser(req, res)) {
    return;
  }
  const onlyPubLish = req.query.onlyPubLish === "true" ? true : false;
  const data = await getLogListFromNow(onlyPubLish);
  res.status(200).json(data);
};

export default handler;
