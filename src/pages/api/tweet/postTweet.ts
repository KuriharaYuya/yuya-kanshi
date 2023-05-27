import { NextApiRequest, NextApiResponse } from "next";

import { generateTweetData } from "./_generateTweet";
import { LogOutPut } from "../../../../libs/notion/types";
import { TwitterApi } from "twitter-api-v2";
import axios from "axios";
import { authUser } from "../_apiAuth";
import { countPublishedLogs } from "../../../../libs/notion/logList";
import { generateCommentData } from "./_generateComment";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // '/api/log/ISO str' の 'ISO str' を取得する;
  if (!authUser(req, res)) {
    return;
  }
  if (!("log" in req.body)) {
    await postTweet("irregular", "ログがありません");
    res.status(200).json({ message: "tweet success" });
    return;
  }
  const log = req.body.log as LogOutPut;
  const numberOfPublishedLogs = await countPublishedLogs(true);
  const tweetText = generateTweetData(log, numberOfPublishedLogs);
  const tweetId = await postTweet("regular", tweetText, log.device.screenTime);
  res.status(200).json(tweetId);
};
export default handler;

type TweetId = string;
const postTweet = async (
  type: "regular" | "irregular",
  tweetText: string,
  logScreenTimeImage?: string
): Promise<TweetId> => {
  const client = new TwitterApi({
    appKey: process.env.NEXT_PUBLIC_APP_KEY as string,
    appSecret: process.env.NEXT_PUBLIC_APP_SECRET as string,
    accessToken: process.env.NEXT_PUBLIC_ACESS_TOKEN as string,
    accessSecret: process.env.NEXT_PUBLIC_ACESS_TOKEN_SECRET as string,
  });

  let lastTweetId = "";
  if (type === "regular") {
    // logImage(s3のリンク)をダウンロード
    const response = await axios.get(logScreenTimeImage!, {
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "binary");
    // 画像をバッファとして取得
    const mediaId = await client.v1.uploadMedia(buffer, {
      type: "image/png",
    });
    const { data } = await client.v2.tweet(tweetText, {
      media: { media_ids: [mediaId] },
    });
    const tweetId = data.id;

    // リプライを送る
    const replyText = generateCommentData();
    await client.v2.reply(replyText, tweetId);
    lastTweetId = tweetId;
    return tweetId;
  } else if (type === "irregular") {
    const { data } = await client.v2.tweet(tweetText);
    const tweetId = data.id;
    lastTweetId = tweetId;
    return tweetId;
  }
  return lastTweetId;
};
