import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
import { generateCommentData, generateCommentData2 } from "./_generateComment";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const bodyData = req.body;

    const tweetText = bodyData.text;
    const screenTimeURl = bodyData.screenTimeURl;
    const morningImageURL = bodyData.morningImageURL;
    const sleepCycleURL = bodyData.sleepCycleURL;
    const gymPicURL = bodyData.gymPicURL;

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

    // ここから

    const screenTimeMediaId = await uploadMedia(screenTimeURl, poni3Client);
    const morningImageMediaId = await uploadMedia(morningImageURL, poni3Client);
    const sleepCycleMediaId = await uploadMedia(sleepCycleURL, poni3Client);
    const gymPicMediaId = await uploadMedia(gymPicURL, poni3Client);

    let data;
    try {
      const result = await poni3Client.v2.tweet(tweetText, {
        media: {
          media_ids: [
            screenTimeMediaId,
            morningImageMediaId,
            sleepCycleMediaId,
            gymPicMediaId,
          ],
        },
      });
      data = result.data;
    } catch (error: any) {
      throw new Error(`Failed to tweet: ${error.message}`);
    }

    const tweetId = data.id;

    // // Send a reply with image

    // // Download the image
    // let buffer2;
    // try {
    //   const response = await axios.get(morningImageURL, {
    //     responseType: "arraybuffer",
    //   });
    //   buffer2 = Buffer.from(response.data, "binary");
    // } catch (error: any) {
    //   throw new Error(`Failed to download image2: ${error.message}`);
    // }

    // // Upload the image as a media
    // let mediaId2;
    // try {
    //   mediaId2 = await poni3Client.v1.uploadMedia(buffer2, {
    //     type: "image/png",
    //   });
    // } catch (error: any) {
    //   throw new Error(`Failed to upload media: ${error.message}`);
    // }

    // // ここまで

    // try {
    //   await poni3Client.v2.reply(memo, tweetId, {
    //     media: { media_ids: [mediaId2] },
    //   });
    // } catch (error: any) {
    //   throw new Error(`Failed to send reply: ${error.message}`);
    // }

    // uploadAndTweetRemainingMedia(
    //   poni3Client,
    //   tweetId,
    //   sleepCycleURL,
    //   gymPicURL
    // );

    res.status(200).json({ lastTweetId: tweetId });
  } catch (globalError) {
    console.error(globalError);
    // @ts-ignore
    res.status(500).json({ error: globalError.message });
  }
};
const uploadAndTweetRemainingMedia = async (
  twClient: TwitterApi,
  tweetId: string,
  sleepCycleURL: string,
  gymPicURL: string
) => {
  const sleepCycleMediaId = await uploadMedia(sleepCycleURL, twClient);
  const gymPicMediaId = await uploadMedia(gymPicURL, twClient);

  try {
    await twClient.v2.reply("残りの画像です", tweetId, {
      media: {
        media_ids: [sleepCycleMediaId, gymPicMediaId],
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to send reply: ${error.message}`);
  }
};
const uploadMedia = async (sourceURL: string, twClient: TwitterApi) => {
  // Download the image
  let buffer;
  try {
    const response = await axios.get(sourceURL, {
      responseType: "arraybuffer",
    });
    buffer = Buffer.from(response.data, "binary");
  } catch (error: any) {
    throw new Error(`Failed to download image${sourceURL}: ${error.message}`);
  }

  // Upload the image as a media
  let mediaId;
  try {
    mediaId = await twClient.v1.uploadMedia(buffer, {
      type: "image/png",
    });
    return mediaId;
  } catch (error: any) {
    throw new Error(`Failed to upload media: ${error.message}`);
  }
};
export default handler;
