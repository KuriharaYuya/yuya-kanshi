import { NextApiRequest, NextApiResponse } from "next";

import { generateTweetData } from "./_generateTweet";
import { LogOutPut } from "../../../../libs/notion/types";
import { TwitterApi } from "twitter-api-v2";
import axios from "axios";
import { fsync, fsyncSync } from "fs";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // '/api/log/ISO str' の 'ISO str' を取得する;
  const log = req.body.log as LogOutPut;
  const tweetText = generateTweetData(log);
  const tweetId = await postTweet(tweetText, log.device.screenTime);
  res.status(200).json(tweetId);
};
export default handler;

type TweetId = string;
const postTweet = async (
  tweetText: string,
  logScreenTimeImage: string
): Promise<TweetId> => {
  const client = new TwitterApi({
    appKey: process.env.NEXT_PUBLIC_APP_KEY as string,
    appSecret: process.env.NEXT_PUBLIC_APP_SECRET as string,
    accessToken: process.env.NEXT_PUBLIC_ACESS_TOKEN as string,
    accessSecret: process.env.NEXT_PUBLIC_ACESS_TOKEN_SECRET as string,
  });

  // logImage(s3のリンク)をダウンロード
  const response = await axios.get(logScreenTimeImage, {
    responseType: "arraybuffer",
  });

  // 画像をファイルとして保存
  const fs = require("fs");
  fs.writeFileSync("./image.png", response.data);

  const mediaId = await client.v1.uploadMedia("./image.png");
  const { data } = await client.v2.tweet(tweetText, {
    media: { media_ids: [mediaId] },
  });

  // ファイルを削除
  fs.unlinkSync("./image.png");
  const tweetId = data.id;
  return tweetId;
};
