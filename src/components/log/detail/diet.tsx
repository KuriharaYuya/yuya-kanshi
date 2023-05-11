import React from "react";
import { LogOutPut } from "../../../../libs/notion/types";
import Image from "next/image";

type Props = {
  dietProps: LogOutPut["diet"];
};

const DietProps = ({ dietProps }: Props) => {
  return (
    <li>
      <h3>ダイエット</h3>
      <ul>
        <li>
          月次の一日の目標カロリー: {dietProps.monthlyCalorieIsUpper}が
          {dietProps.monthlyCalorie}kcal
          <br />
          上限か下限か
        </li>
        <li>gap：{dietProps.todayCalorieGap}kcal</li>
        <li>今日の摂取カロリー：{dietProps.todayCalorie}kcal</li>
        <br />
        証明写真
        <Image
          src={dietProps.myFitnessPal}
          alt="proof-image"
          width={200}
          height={200}
        />
      </ul>
    </li>
  );
};

export default DietProps;
