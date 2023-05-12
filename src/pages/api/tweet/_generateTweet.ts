import { convertToJST } from "@/libs/timeLib";
import { LogOutPut } from "../../../../libs/notion/types";
import { SERVER_URL } from "@/libs/server";

export const generateTweetData = (log: LogOutPut) => {
  /*
2023/05/07 今日の記録

起床時間 10:00 目標より20分早い
スクリーンタイム 目標より15分少ない
食事: 3000kcal 目標より500少ない

下記URLでタスク以外の３つの行動が事実である証明をしています。

明日も頑張ります
  */
  const str = `
${convertToJST(log.date, "A")} 今日の記録

起床時間 ${convertToJST(
    log.mornings.morningActivityTime,
    "B"
  )} 前日計画した目標時刻より${log.mornings.morningActivityGapMinutes}

スクリーンタイム ${log.device.todayScreenTime}分 月次の日毎目標より${
    log.device.screenTimeGapMinutes
  }

食事: ${log.diet.todayCalorie}kcal 月次の日毎目標の${
    log.diet.monthlyCalorie
  }kcal(${log.diet.monthlyCalorieIsUpper})より${log.diet.todayCalorieGap}

下記で行動が事実である証明をしています
${SERVER_URL()}/${log.date}
`;
  return str;
};
