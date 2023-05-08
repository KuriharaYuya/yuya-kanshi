import { Client } from "@notionhq/client";
import {
  Device,
  Diet,
  LogProperty,
  MonthlyRecord,
  Morning,
  MorningActivity,
} from "./types";

function getMinuteDifference(dateString1: string, dateString2: string): number {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);
  const differenceInMs = Math.abs(date1.getTime() - date2.getTime());
  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
  return differenceInMinutes;
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
  };
};

export const digDietData = (
  logProps: LogProperty,
  monthlyProps: MonthlyRecord
): Diet => {
  return {
    myFitnessPal: logProps.myFitnessPal.files[0].file.url,
    todayCalorie: logProps.todayCalorie.number,
    monthlyCalorie: monthlyProps.monthlyCalorie.number,
    todayCalorieGap:
      monthlyProps.monthlyCalorie.number - logProps.todayCalorie.number,
  };
};

export const digDeviceData = (
  logProps: LogProperty,
  monthlyProps: MonthlyRecord
): Device => {
  return {
    screenTime: logProps.screenTime.files[0].file.url,
    todayScreenTime: logProps.todayScreenTime.number,
    screenTimeGapMinutes:
      monthlyProps.monthlyScreenTime.number - logProps.todayScreenTime.number,
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
