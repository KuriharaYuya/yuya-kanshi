import { msg } from "../../../../libs/line";
import { MessageProp } from "../../../../libs/line/type";
import appendContents from "../notion/appendContents";

export const publishLog = async (commandProps: MessageProp) => {
  const pageURL = await appendContents(commandProps.dateIso);
  msg(`${commandProps.dateIso}のログを投稿しました
  
  urlはこちらです
    ${pageURL}
  
  `);
};
