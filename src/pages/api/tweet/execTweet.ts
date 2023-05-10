import { LogListType } from "@/pages";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { notion } from "../../../../libs/notion/utils";
import { LogOutPut } from "../../../../libs/notion/types";
import { SERVER_URL } from "@/libs/server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const tgtDate = req.query.date as string;

  // headerのauthを検証する
  authUser(req, res);
  const { data } = (await axios.get(
    `${SERVER_URL}/api/log?date=${tgtDate}`
  )) as { data: LogOutPut };
  const log = data;
  // publishedがtrue && tweetUrlが空であるかを確認する
  const isValidLog = await validateLog(log);
  if (!isValidLog) {
    // 無効ならメッセージ付きで500エラーを出す
    res.status(500).json({ message: "Invalid log" });
    return;
  }

  // 無効でなければ、tweetを実行する

  // ここでtwwet用APIを実行する

  const tweetId = await axios.post(`${SERVER_URL}/api/tweet/postTweet`, {
    log,
  });
  //   TODO: call lambda function

  const tweetUrl = `https://twitter.com/intern_ukaruzo/status/${tweetId.data}`;
  await writeTweetUrl(log, tweetUrl);
  res.status(200).json({ message: "tweet success" });
};

const authUser = (req: NextApiRequest, res: NextApiResponse) => {
  const isAuth =
    req.headers.authorization ==
    `Bearer ${process.env.NEXT_PUBLIC_TWEET_AUTH_TOKEN}`;
  // if (!isAuth) {
  //   res.status(401).json({ message: "Unauthorized" });
  //   return;
  // }
};

const validateLog = async (log: LogListType) => {
  //   日付に一致するページを"佑弥管理DB"から取得する

  // publishedがtrue && tweetUrlが空であるかを確認する
  const isPublished = log.published === true;
  const isTweetUrlEmpty = log.tweetUrl == null || log.tweetUrl === "";
  const isValid = isPublished && isTweetUrlEmpty;
  return isValid;
};

const writeTweetUrl = async (log: LogListType, tweetUrl: string) => {
  //   "佑弥管理DB"の該当ページのtweetUrlに値を書き込む
  await notion.pages.update({
    page_id: log.uuid,
    properties: {
      tweetUrl: {
        url: tweetUrl,
      },
    },
  });
};

export const callExecTweetApi = async (date: string) => {
  // heaeder に Authorization をつける
  const axiosBase = axios.create({
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWEET_AUTH_TOKEN}`,
    },
  });
  const res = await axiosBase.get(
    `${SERVER_URL}/api/tweet/execTweet?date=${date}`
  );
  return res.data;
};

export default handler;
