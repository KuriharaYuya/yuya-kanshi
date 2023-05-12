import React from "react";
import { LogOutPut } from "../../../../libs/notion/types";
import Image from "next/image";
import { Paper } from "@mui/material";

type Props = {
  dietProps: LogOutPut["diet"];
};

const DietProps = ({ dietProps }: Props) => {
  return (
    <Paper
      elevation={5}
      style={{ width: "95%", margin: "0 auto", marginBottom: "1rem" }}
    >
      <h3>ダイエット</h3>
      <ul>
        <li>
          月次の一日の目標カロリー: {dietProps.monthlyCalorieIsUpper}が
          {dietProps.monthlyCalorie}kcal
          <br />
        </li>
        <li>gap：{dietProps.todayCalorieGap}kcal</li>
        <li>今日の摂取カロリー：{dietProps.todayCalorie}kcal</li>
        <br />
      </ul>
      証明写真
      <Image
        src={dietProps.myFitnessPal}
        alt="proof-image"
        width={117 * 2.3}
        height={253 * 2.3}
        style={{ margin: "0 auto", display: "block" }}
      />
    </Paper>
  );
};

export default DietProps;
