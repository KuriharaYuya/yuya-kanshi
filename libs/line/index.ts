import { Client } from "@line/bot-sdk";

export const lineClient = new Client({
  channelAccessToken: process.env.NEXT_PUBLIC_LINE_CHANNEL_ACCESS_TOKEN!,
  channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET!,
});

export const msg = (date: string) => {
  const userId = process.env.NEXT_PUBLIC_LINE_YUYA_USER_ID!;
  lineClient.pushMessage(userId, {
    type: "text",
    text: date,
  });
};
