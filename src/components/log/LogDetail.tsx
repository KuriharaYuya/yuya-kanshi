import { LogOutPut } from "../../../libs/notion/types";
import MorningProps from "./detail/morning";
import DietProps from "./detail/diet";
import DeviceProps from "./detail/device";
import styled from "./detail/section.module.scss";
import { Button } from "@mui/material";
import Router from "next/router";
import { useEffect } from "react";
import { generateTweetData } from "@/pages/api/tweet/_generateTweet";
import CheckListProps from "./detail/checkList";
import HostImageProps from "./detail/hostsImage";

type Props = {
  logOutput: LogOutPut;
};

const DisplayLog = ({ logOutput }: Props) => {
  const handleJumpToLogList = () => {
    Router.push("/");
  };
  // useEffect(() => {
  //   const tweetText = generateTweetData(logOutput, 999);
  //   console.log(tweetText);
  //   console.log(tweetText.length);
  // }, []);
  return (
    <>
      <Button onClick={handleJumpToLogList}>一覧ページへ</Button>
      <h1 style={{ textAlign: "center", margin: "0 auto" }}>
        {logOutput.date}の記録
      </h1>
      <a
        style={{ textAlign: "center", margin: "0 auto" }}
        href={logOutput.tweetUrl}
      >
        twitterのURL
      </a>
      <MorningProps morningProps={logOutput.mornings} />
      <DeviceProps deviceProps={logOutput.device} />
      <DietProps dietProps={logOutput.diet} />
      <CheckListProps diaryProps={logOutput.diary} />
      <HostImageProps hostsImageProps={logOutput.hostsImage} />
      <Button onClick={handleJumpToLogList}>一覧ページへ</Button>
    </>
  );
};
export default DisplayLog;
