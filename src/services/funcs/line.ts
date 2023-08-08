import { msg } from "../../../libs/line";
import { LogStatus, MessageProp } from "../../../libs/line/type";
import { getLogDetail } from "../../../libs/notion/log";

export const getMessageProp = (command: string) => {
  if (!command.startsWith("コンソール: ")) return null;

  const commandBody = command.slice("コンソール: ".length);
  const types = { status: "ステータス", publish: "投稿" };
  if (
    commandBody.startsWith(types.status) ||
    commandBody.startsWith(types.publish)
  ) {
    const type = commandBody.startsWith("ステータス") ? "ステータス" : "投稿";
    const dateIso = commandBody.slice(type.length).replace(/\//g, "-");
    const props: MessageProp = {
      type: type,
      dateIso: dateIso,
    };
    return props;
  } else {
    msg("サポートされていないメッセージです");
    return null;
  }
};

export const getLogStatus = async (dateIso: string): Promise<LogStatus> => {
  const log = await getLogDetail(dateIso);

  if (log === "存在しない") {
    return "存在しない";
  } else if (log == "準備未完了") {
    return "準備未完了";
  }

  if (log.filledAtr && log.published) {
    return "投稿済み";
  } else if (log.filledAtr && !log.published) {
    return "準備完了";
  } else if (!log.filledAtr && !log.published) {
    return "準備未完了";
  } else {
    return "不明";
  }

  //   const approved = log?.filledAtr ? true : false;
  //   const statusMsg = approved ? "準備完了" : "準備未完了";
  //   msg(`${msgProps.dateIso}のステータスは${statusMsg}です`);
  //   break;
  // case "投稿":
  //   msg(`${msgProps.dateIso}を投稿しました`);
  //   break;
  // default:
  //   break;
};
