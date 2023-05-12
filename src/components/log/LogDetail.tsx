import { LogOutPut } from "../../../libs/notion/types";
import MorningProps from "./detail/morning";
import DietProps from "./detail/diet";
import DeviceProps from "./detail/device";
import styled from "./detail/section.module.scss";

type Props = {
  logOutput: LogOutPut;
};

const DisplayLog = ({ logOutput }: Props) => {
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "0 auto" }}>
        {logOutput.date}の記録
      </h1>
      <div style={{ textAlign: "center", margin: "0 auto" }}>
        <a href={logOutput.tweetUrl}>twitterのURL</a>
      </div>
      <MorningProps morningProps={logOutput.mornings} />
      <DeviceProps deviceProps={logOutput.device} />
      <DietProps dietProps={logOutput.diet} />
    </>
  );
};
export default DisplayLog;
