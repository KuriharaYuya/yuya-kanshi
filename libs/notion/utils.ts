import { Client } from "@notionhq/client";
import {
  Device,
  Diet,
  LogProperty,
  MonthlyRecord,
  Morning,
  MorningActivity,
} from "./types";

function getMinuteDifference(dateString1: string, dateString2: string): string {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);
  const differenceInMs = date2.getTime() - date1.getTime();
  const differenceInMinutes = Math.floor(
    Math.abs(differenceInMs) / (1000 * 60)
  );

  if (differenceInMs < 0) {
    return `${differenceInMinutes}分遅い`;
  } else {
    return `${differenceInMinutes}分早い`;
  }
}

export const digMorningData = (
  logProps: LogProperty,
  morningActivity: MorningActivity
): Morning => {
  return {
    morningImage: logProps.morningImage.files[0].file.url,
    morningActivityTime: logProps.morningActivityTime.date.start,
    morningActivityEstimatedTime:
      morningActivity.morningActivityEstimatedTime.date.start,
    //   TODO わんちゃんここで関数作って計算させるしかないかもね
    morningActivityGapMinutes: getMinuteDifference(
      logProps.morningActivityTime.date.start,
      morningActivity.morningActivityEstimatedTime.date.start
    ),
    morningActivityLastEdited:
      morningActivity.morningActivityLastEdited.last_edited_time,
    morningTargetPlace: morningActivity.morningTargetPlace.title[0].plain_text,
  };
};

const getCalorieDifference = (
  monthlyCalorie: number,
  todayCalorie: number
): string => {
  const difference = monthlyCalorie - todayCalorie;

  if (difference < 0) {
    return `${Math.abs(difference)}kcal多い`;
  } else if (difference > 0) {
    return `${difference}kcal少ない`;
  } else {
    return "目標通り";
  }
};
const isUpperToMsg = (isUpper: boolean): string => {
  if (isUpper) {
    return "上限";
  } else {
    return "下限";
  }
};

export const digDietData = (
  logProps: LogProperty,
  monthlyProps: MonthlyRecord
): Diet => {
  return {
    myFitnessPal: logProps.myFitnessPal.files[0].file.url,
    todayCalorie: logProps.todayCalorie.number,
    monthlyCalorie: monthlyProps.monthlyCalorie.number,
    todayCalorieGap: getCalorieDifference(
      monthlyProps.monthlyCalorie.number,
      logProps.todayCalorie.number
    ),
    monthlyCalorieIsUpper: isUpperToMsg(
      monthlyProps.monthlyCalorieIsUpper.checkbox
    ),
  };
};
const getScreenTimeDifference = (
  monthlyScreenTime: number,
  todayScreenTime: number
): string => {
  const difference = monthlyScreenTime - todayScreenTime;
  if (difference < 0) {
    return `${Math.abs(difference)}分多い`;
  }
  if (difference > 0) {
    return `${difference}分少ない`;
  } else {
    return "目標通り";
  }
};

export const digDeviceData = (
  logProps: LogProperty,
  monthlyProps: MonthlyRecord
): Device => {
  return {
    screenTime: logProps.screenTime.files[0].file.url,
    todayScreenTime: logProps.todayScreenTime.number,
    screenTimeGapMinutes: getScreenTimeDifference(
      monthlyProps.monthlyScreenTime.number,
      logProps.todayScreenTime.number
    ),
    monthlyScreenTime: monthlyProps.monthlyScreenTime.number,
  };
};

// ----------------------------------------
// declare notion Client
// ----------------------------------------
export const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_API_KEY,
});

// ----------------------------------------
// declare notion Client
// ----------------------------------------
