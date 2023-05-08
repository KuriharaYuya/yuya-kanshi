// notion primitives
// ----------------------------------------
export type FileProperty = {
  files: [{ file: { url: string } }];
};
export type LastEditedTimeProperty = {
  last_edited_time: string;
};

export type NumberProperty = {
  number: number;
};
export type TitleProperty = {
  title: [{ plain_text: string }];
};
export type DateProperty = {
  date: { start: string };
};
// ----------------------------------------
// notion primitives

// ----------------------------------------
// notion API response type components
export type Morning = {
  morningImage: string;
  morningActivityTime: string;
  morningActivityEstimatedTime: string;
  morningActivityGapMinutes: number;
  morningActivityLastEdited: string;
};

export type Diet = {
  myFitnessPal: string;
  todayCalorie: number;
  monthlyCalorie: number;
  todayCalorieGap: number;
};

export type Device = {
  screenTime: string;
  todayScreenTime: number;
  screenTimeGapMinutes: number;
  monthlyScreenTime: number;
};
// notion API response type components
// ----------------------------------------

// ----------------------------------------
// notion API response types
export type LogProperty = {
  // TODO ここで、掘るよ
  title: TitleProperty;
  date: DateProperty;
  morningImage: FileProperty;
  myFitnessPal: FileProperty;
  todayCalorie: NumberProperty;
  screenTime: FileProperty;
  todayScreenTime: NumberProperty;
  morningActivityTime: DateProperty;
  canPublish: boolean;
};

export type MorningActivity = {
  morningActivityEstimatedTime: DateProperty;
  morningActivityLastEdited: LastEditedTimeProperty;
};

export type MonthlyRecord = {
  monthlyScreenTime: NumberProperty;
  monthlyCalorie: NumberProperty;
};
// ----------------------------------------
// notion API response types

// ----------------------------------------
// notion API response in the end
export type LogOutPut = {
  title: string;
  date: string;
  mornings: Morning;
  diet: Diet;
  device: Device;
  canPublish: boolean;
};
