import { LogOutPut } from "../../../../libs/notion/types";
import { convertToJST } from "./_timeLib";

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

起床時間 ${convertToJST(log.mornings.morningActivityTime, "B")} 目標より${
    log.mornings.morningActivityGapMinutes
  }分${log.mornings.morningActivityGapMinutes > 0 ? "早い" : "遅い"}
スクリーンタイム ${log.device.todayScreenTime} 目標より${
    log.device.screenTimeGapMinutes
  }分${log.device.screenTimeGapMinutes > 0 ? "少ない" : "多い"}
食事: ${log.diet.todayCalorie}kcal 目標より${log.diet.todayCalorieGap}kcal${
    log.diet.todayCalorieGap > 0 ? "少ない" : "多い"
  }

下記URLでタスク以外の３つの行動が事実である証明をしています。
http://loccalhost:3000/log/${log.date}

明日も頑張ります
`;
  return str;
};
