// notion built-in types
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

export type FormulaBooleanProperty = {
  formula: { boolean: boolean };
};
export type FormulaStringProperty = {
  formula: { string: string };
};

export type UrlProperty = {
  url: string;
};

export type BooleanProperty = {
  checkbox: boolean;
};
// ----------------------------------------
// notion built-in types

// ----------------------------------------
// notion API response type components
export type Morning = {
  morningImage: string;
  morningActivityTime: string;
  morningActivityEstimatedTime: string;
  morningActivityGapMinutes: string;
  morningActivityLastEdited: string;
  morningTargetPlace: string;
};

export type Diet = {
  myFitnessPal: string;
  todayCalorie: number;
  monthlyCalorie: number;
  todayCalorieGap: string;
  monthlyCalorieIsUpper: string;
};

export type Device = {
  screenTime: string;
  todayScreenTime: number;
  screenTimeGapMinutes: string;
  monthlyScreenTime: number;
};
// notion API response type components
// ----------------------------------------

// ----------------------------------------
// notion API response types
export type LogProperty = {
  // TODO ここで、掘るよ
  uuid: FormulaStringProperty;
  title: TitleProperty;
  date: DateProperty;
  morningImage: FileProperty;
  myFitnessPal: FileProperty;
  todayCalorie: NumberProperty;
  screenTime: FileProperty;
  todayScreenTime: NumberProperty;
  morningActivityTime: DateProperty;
  published: FormulaBooleanProperty;
  tweetUrl: UrlProperty;
};

export type MorningActivity = {
  morningActivityEstimatedTime: DateProperty;
  morningActivityLastEdited: LastEditedTimeProperty;
  morningTargetPlace: TitleProperty;
};

export type MonthlyRecord = {
  monthlyScreenTime: NumberProperty;
  monthlyCalorie: NumberProperty;
  monthlyCalorieIsUpper: BooleanProperty;
};
// ----------------------------------------
// notion API response types

// ----------------------------------------
// notion API response in the end
export type LogOutPut = {
  uuid: string;
  title: string;
  date: string;
  mornings: Morning;
  diet: Diet;
  device: Device;
  published: boolean;
  tweetUrl: string;
};

// ----------------------------------------
// notion API response at LIST
type LogListProperty = {
  uuid: FormulaStringProperty;
  title: TitleProperty;
  tweetUrl: UrlProperty;
  date: DateProperty;
  published: FormulaBooleanProperty;
};
export type LogListPropertyForGitLikeCalender = [
  {
    properties: LogListProperty;
  }
];

// ----------------------------------------
// notion API response at LIST
// ----------------------------------------

// ----------------------------------------
// notion API response at Table
// ----------------------------------------

export type LogTableProperty = LogListProperty[];
// ----------------------------------------
// notion API response at Table
// ----------------------------------------
