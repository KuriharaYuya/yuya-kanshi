import { NextApiRequest, NextApiResponse } from "next";

import { checkLogStatus } from "@/services/actions/line/checkLogStatus";
import { LineEvent } from "../../../../libs/line/type";
import { getMessageProp } from "@/services/funcs/line";
import { publishLog } from "@/services/actions/line/publishLog";
import { msg } from "../../../../libs/line";

interface LineRequestBody {
  events: LineEvent[];
}

const handler = async (
  req: NextApiRequest & { body: LineRequestBody },
  res: NextApiResponse
) => {
  if (req.method !== "POST") return res.status(405).end();

  const text = req.body.events[0].message.text as string;

  // メッセージの種類と日付を取得する
  const commandProps = getMessageProp(text);

  // 対応していないメッセージの場合は処理を終了する
  if (commandProps == null) return;

  if (commandProps.type === "ステータス") {
    await checkLogStatus(commandProps);
    res.status(200).json({ message: "success" });
  } else if (commandProps.type === "投稿") {
    res.status(200).json({ message: "success" });
    msg(`${commandProps.dateIso}のログを投稿中...`);
    await publishLog(commandProps);
  }
  return;
};

export default handler;
