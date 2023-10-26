import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
import { generateCommentData } from "./_generateComment";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const bodyData = req.body;
    const tweetText = bodyData.text;
    const imagePath = bodyData.mediaUrl;

    const client = new TwitterApi({
      appKey: process.env.NEXT_PUBLIC_YUYA_APP_KEY as string,
      appSecret: process.env.NEXT_PUBLIC_YUYA_APP_SECRET as string,
      accessToken: process.env.NEXT_PUBLIC_YUYA_ACESS_TOKEN as string,
      accessSecret: process.env.NEXT_PUBLIC_YUYA_ACESS_TOKEN_SECRET as string,
    });

    const poni3Client = new TwitterApi({
      appKey: process.env.NEXT_PUBLIC_PONI3_APP_KEY as string,
      appSecret: process.env.NEXT_PUBLIC_PONI3_APP_SECRET as string,
      accessToken: process.env.NEXT_PUBLIC_PONI3_ACESS_TOKEN as string,
      accessSecret: process.env.NEXT_PUBLIC_PONI3_ACESS_TOKEN_SECRET as string,
    });

    let lastTweetId = "";

    // Download the image
    let buffer;
    try {
      const response = await axios.get(imagePath, {
        responseType: "arraybuffer",
      });
      buffer = Buffer.from(response.data, "binary");
    } catch (error: any) {
      throw new Error(`Failed to download image: ${error.message}`);
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

    // Send a reply
    try {
      await poni3Client.v2.reply(generateCommentData(), tweetId);
    } catch (error: any) {
      throw new Error(`Failed to send reply: ${error.message}`);
    }

    lastTweetId = tweetId;

    // Retweet
    let authenticatedUserId;
    try {
      const response = await client.v1.verifyCredentials();
      authenticatedUserId = response.id_str; // or response.id depending on the returned object structure
    } catch (error: any) {
      throw new Error(
        `Failed to get authenticated user's ID: ${error.message}`
      );
    }

    // Use authenticatedUserId wherever you need it
    // const retweetTgtUserId = authenticatedUserId;
    // try {
    //   console.log(`Retweeting ${retweetTgtUserId}'s tweet...${tweetId}`);
    //   const idStr = "kurihara_poni3";
    //   await client.v2.retweet(idStr, tweetId);
    // } catch (error: any) {
    //   console.error(error);
    //   throw new Error(
    //     `Failed to retweet: ${error.message} - ${error?.errors?.[0]?.message}`
    //   );
    // }

    res.status(200).json({ lastTweetId });
  } catch (globalError) {
    console.error(globalError);
    // @ts-ignore
    res.status(500).json({ error: globalError.message });
  }
};

export default handler;
