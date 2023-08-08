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

  const eventType = req.body.events[0].type;
  if (eventType === "join") {
    // 必要な処理をここに追加します（例えば、「参加しました」というメッセージを送るなど）
    // msg('参加しました！');
    return res.status(200).json({ message: "success" });
  }

  const text = req.body.events[0].message.text as string;

  // メッセージの種類と日付を取得する
  const commandProps = getMessageProp(text);

  // 対応していないメッセージの場合は処理を終了する
  if (commandProps == null) return;

  if (commandProps.type === "ステータス") {
    await checkLogStatus(commandProps);
  } else if (commandProps.type === "投稿") {
    msg(`${commandProps.dateIso}のログを投稿中...`);
    await publishLog(commandProps);
  }
  return res.status(200).json({ message: "success" });
};

export default handler;
