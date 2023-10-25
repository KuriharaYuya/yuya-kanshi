import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
import { generateCommentData } from "./_generateComment";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // bodyにはjsonでこうくる
  // {
  //     text: "string",
  //     mediaUrl: "string",
  // }
  const bodyData = req.body;
  const tweetText = bodyData.text;
  const imagePath = bodyData.mediaUrl;
  console.log(imagePath);
  //     - [ ]  textをそのまま反映。
  // - [ ]  画像をローカルに落としてmediaに上げる。
  // - [ ]  投稿
  // - [ ]  リツイート
  const client = new TwitterApi({
    appKey: process.env.NEXT_PUBLIC_APP_KEY as string,
    appSecret: process.env.NEXT_PUBLIC_APP_SECRET as string,
    accessToken: process.env.NEXT_PUBLIC_ACESS_TOKEN as string,
    accessSecret: process.env.NEXT_PUBLIC_ACESS_TOKEN_SECRET as string,
  });

  let lastTweetId = "";

  // logImage(s3のリンク)をダウンロード
  const response = await axios.get(imagePath, {
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
  res.status(200).json({ lastTweetId });
};

export default handler;
