import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
import { generateCommentData, generateCommentData2 } from "./_generateComment";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const bodyData = req.body;

    const tweetText = bodyData.text;
    const imagePath = bodyData.screenTimeURl;
    const memo = bodyData.memo;
    const calenderPicURl = bodyData.calenderPicURl;

    const poni3Client = new TwitterApi({
      appKey: process.env.NEXT_PUBLIC_PONI3_APP_KEY as string,
      appSecret: process.env.NEXT_PUBLIC_PONI3_APP_SECRET as string,
      accessToken: process.env.NEXT_PUBLIC_PONI3_ACESS_TOKEN as string,
      accessSecret: process.env.NEXT_PUBLIC_PONI3_ACESS_TOKEN_SECRET as string,
    });

    // production環境でもconsole.logを出力する
    console.log("appKey", process.env.NEXT_PUBLIC_PONI3_APP_KEY);
    console.log("appSecret", process.env.NEXT_PUBLIC_PONI3_APP_SECRET);
    console.log("accessToken", process.env.NEXT_PUBLIC_PONI3_ACESS_TOKEN);
    console.log(
      "accessSecret",
      process.env.NEXT_PUBLIC_PONI3_ACESS_TOKEN_SECRET
    );

    let lastTweetId = "";

    // Download the image
    let buffer;
    try {
      const response = await axios.get(imagePath, {
        responseType: "arraybuffer",
      });
      buffer = Buffer.from(response.data, "binary");
    } catch (error: any) {
      throw new Error(`Failed to download image2: ${error.message}`);
    }

    // Upload the image as a media
    let mediaId;
    try {
      mediaId = await poni3Client.v1.uploadMedia(buffer, {
        type: "image/png",
      });
    } catch (error: any) {
      throw new Error(`Failed to upload media: ${error.message}`);
    }

    let data;
    try {
      const result = await poni3Client.v2.tweet(tweetText, {
        media: { media_ids: [mediaId] },
      });
      data = result.data;
    } catch (error: any) {
      throw new Error(`Failed to tweet: ${error.message}`);
    }

    const tweetId = data.id;

    // Send a reply with image

    // Download the image
    let buffer2;
    try {
      const response = await axios.get(calenderPicURl, {
        responseType: "arraybuffer",
      });
      buffer2 = Buffer.from(response.data, "binary");
    } catch (error: any) {
      throw new Error(`Failed to download image2: ${error.message}`);
    }

    // Upload the image as a media
    let mediaId2;
    try {
      mediaId2 = await poni3Client.v1.uploadMedia(buffer2, {
        type: "image/png",
      });
    } catch (error: any) {
      throw new Error(`Failed to upload media: ${error.message}`);
    }

    try {
      await poni3Client.v2.reply(memo, tweetId, {
        media: { media_ids: [mediaId2] },
      });
    } catch (error: any) {
      throw new Error(`Failed to send reply: ${error.message}`);
    }

    lastTweetId = tweetId;

    res.status(200).json({ lastTweetId });
  } catch (globalError) {
    console.error(globalError);
    // @ts-ignore
    res.status(500).json({ error: globalError.message });
  }
};

export default handler;
