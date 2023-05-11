import { LogOutPut } from "../../../libs/notion/types";
import MorningProps from "./detail/morning";
import DietProps from "./detail/diet";
import DeviceProps from "./detail/device";

type Props = {
  logOutput: LogOutPut;
};

const DisplayLog = ({ logOutput }: Props) => {
  return (
    <div>
      <MorningProps morningProps={logOutput.mornings} />
      <DeviceProps deviceProps={logOutput.device} />
      <DietProps dietProps={logOutput.diet} />
    </div>
  );
};
export default DisplayLog;
