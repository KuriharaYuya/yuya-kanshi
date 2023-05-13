import { LogOutPut } from "../../../libs/notion/types";
import MorningProps from "./detail/morning";
import DietProps from "./detail/diet";
import DeviceProps from "./detail/device";
import styled from "./detail/section.module.scss";
import { Button } from "@mui/material";
import Router from "next/router";

type Props = {
  logOutput: LogOutPut;
};

const DisplayLog = ({ logOutput }: Props) => {
  const handleJumpToLogList = () => {
    Router.push("/");
  };
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
      <Button onClick={handleJumpToLogList}>一覧ページへ</Button>
    </>
  );
};
export default DisplayLog;
