import { getLogStatus, getMessageProp } from "@/services/funcs/line";
import { msg } from "../../../../libs/line";
import { MessageProp } from "../../../../libs/line/type";

export const checkLogStatus = async (commandProps: MessageProp) => {
  // ログのステータスを確認する

  const logStatus = await getLogStatus(commandProps.dateIso);

  // ログが存在しない場合は処理を終了する

  // それぞれのアクションを実行
  switch (logStatus) {
    case "投稿済み":
      msg(`${commandProps.dateIso}はすでに投稿されています`);
      break;
    case "準備完了":
      msg(`${commandProps.dateIso}は準備完了です`);
      break;
    case "準備未完了":
      msg(`${commandProps.dateIso}は準備未完了です`);
      break;
    case "存在しない":
      msg(`${commandProps.dateIso}のログは存在しません`);
      break;
  }
};
