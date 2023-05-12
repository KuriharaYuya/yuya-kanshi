import { LogOutPut } from "../../../libs/notion/types";
import MorningProps from "./detail/morning";
import DietProps from "./detail/diet";
import DeviceProps from "./detail/device";
import { useEffect } from "react";
import { generateTweetData } from "@/pages/api/tweet/_generateTweet";
import { countPublishedLogs } from "../../../libs/notion/logList";

type Props = {
  logOutput: LogOutPut;
};

const DisplayLog = ({ logOutput }: Props) => {
  // useEffect(() => {
  //   (async () => {
  //     const numberOfLogs = await countPublishedLogs(true);
  //     const text = generateTweetData(logOutput, numberOfLogs);
  //     console.log(text);
  //     console.log(text.length);
  //   })();
  // }, [logOutput]);

  return (
    <div>
      <MorningProps morningProps={logOutput.mornings} />
      <DeviceProps deviceProps={logOutput.device} />
      <DietProps dietProps={logOutput.diet} />
    </div>
  );
};
export default DisplayLog;
