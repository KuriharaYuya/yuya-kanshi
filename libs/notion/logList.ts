import { LogListType } from "@/pages";
import { LogListPropertyForGitLikeCalender, LogTableProperty } from "./types";
import { notion } from "./utils";

export const getLogListFromNow = async (
  onlyPubLish: boolean
): Promise<LogListOutPut> => {
  const conditions = switchSearchCondition(onlyPubLish);
  const { results } = await notion.databases.query({
    database_id: "8af74dfac9a0482bab353741bb355971",
    filter: conditions,

    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  });
  //   @ts-ignore
  const data: LogListPropertyForGitLikeCalender = results;
  return {
    calenderData: destructureForCalenderData(data),
    tableData: destructureForTable(data),
  };
};

type CalenderData = { [date: string]: number };
export type LogListOutPut = {
  calenderData: CalenderData;
  tableData: LogListType[];
};

const destructureForCalenderData = (
  data: LogListPropertyForGitLikeCalender
): CalenderData => {
  interface Log {
    properties: {
      date: {
        date: {
          start: string;
        };
      };
    };
  }
  const values: { [key: string]: number } = data!.reduce(
    (acc: { [key: string]: number }, cur: Log) => {
      acc[cur.properties.date.date.start] = 4;
      return acc;
    },
    {}
  );
  return values;
};

const destructureForTable = (
  data: LogListPropertyForGitLikeCalender
): LogListType[] => {
  const tgt = data.map((log) => {
    return {
      uuid: log.properties.uuid.formula.string,
      date: log.properties.date.date.start,
      title: log.properties.title.title[0].plain_text,
      tweetUrl: log.properties.tweetUrl.url,
      published: log.properties.published.formula.boolean,
    };
  });
  return tgt;
};

const switchSearchCondition = (onlyPubLish: boolean) => {
  if (onlyPubLish) {
    return {
      and: [
        {
          property: "published",
          formula: {
            checkbox: {
              equals: true,
            },
          },
        },
        {
          property: "date",
          date: {
            past_year: {},
          },
        },
      ],
    };
  } else {
    return {
      property: "date",
      date: {
        past_year: {},
      },
    };
  }
};

export const countPublishedLogs = async (
  onlyPubLish: boolean
): Promise<number> => {
  const conditions = switchSearchCondition(onlyPubLish);
  const { results } = await notion.databases.query({
    database_id: "8af74dfac9a0482bab353741bb355971",
    filter: conditions,

    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  });
  //   @ts-ignore
  const data: LogListPropertyForGitLikeCalender = results;
  const count = data.length;
  return count;
};
