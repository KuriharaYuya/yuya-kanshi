import {
  HostsImageRecord,
  LogOutPut,
  LogProperty,
  MonthlyRecord,
  MorningActivity,
} from "./types";
import {
  digDeviceData,
  digDiaryData,
  digDietData,
  digHostImageData,
  digMorningData,
  notion,
} from "./utils";
import { getLogListFromNow } from "./logList";

// 指定した日付のnotionのページを取得し、加工した上で返却する
export const getLogDetail = async (tgtDate: string) => {
  //   日付に一致するページを"佑弥管理DB"から取得する
  const { results } = await notion.databases.query({
    database_id: "8af74dfac9a0482bab353741bb355971",
    filter: {
      property: "date",
      date: {
        equals: tgtDate,
      },
    },
  });

  // まず、ここで投稿が不完全であることを検証する。trueであれば、500エラーを返す

  if (
    results.length === 0 ||
    //  @ts-ignore
    (results.length > 1 && results.properties.published === false)
  ) {
    // 500エラーを返す
    return;
  }

  //   @ts-ignore
  const logId = results[0].id;
  //   @ts-ignore
  const logProperty = results[0].properties;

  //   取得した佑弥管理DBのページIDから紐づいているデータを取得する
  const morningActivity = await getMorningActivity(logId);
  const monthlyRecord = await getMonthlyRecord(logId);
  const HostsImageRecord = await getHostImageRecord(logId);

  //   フロント側で使いたい形に整形し返却
  return createLogOutput(
    logProperty,
    morningActivity,
    monthlyRecord,
    HostsImageRecord
  );
};

const getMorningActivity = async (logId: string) => {
  const { results } = await notion.databases.query({
    database_id: "472561d83e9247e6b018b271e5e95dad",
    filter: {
      property: "佑弥管理",
      relation: {
        contains: logId,
      },
    },
  });
  // @ts-ignore
  const morningProps: MorningActivity = results[0].properties;
  return morningProps;
};

const getMonthlyRecord = async (logId: string) => {
  const { results } = await notion.databases.query({
    database_id: "cf0777ea654d49d7b09b9f9a9cab747f",
    filter: {
      property: "佑弥管理",
      relation: {
        contains: logId,
      },
    },
  });
  // @ts-ignore
  const monthlyProps: MonthlyRecord = results[0].properties;
  return monthlyProps;
};
const getHostImageRecord = async (logId: string) => {
  const { results } = await notion.databases.query({
    database_id: "4e0e1441d11b41b2a526dc5c0f0f27fc",
    filter: {
      property: "佑弥管理",
      relation: {
        contains: logId,
      },
    },
  });
  // @ts-ignore
  const hostProps: HostsImageRecord = results[0].properties;
  return hostProps;
};

const createLogOutput = (
  logProps: LogProperty,
  morningActivity: MorningActivity,
  monthlyProps: MonthlyRecord,
  hostsImageRecord: HostsImageRecord
): LogOutPut => {
  // それぞれのデータを加工する
  const mornings = digMorningData(logProps, morningActivity);
  const device = digDeviceData(logProps, monthlyProps);
  const diet = digDietData(logProps, monthlyProps);
  const diary = digDiaryData(logProps);
  const hostsImage = digHostImageData(logProps, hostsImageRecord);
  // const hostImage =

  //   結合する
  const logOutput: LogOutPut = {
    uuid: logProps.uuid.formula.string,
    title: logProps.title.title[0].plain_text,
    date: logProps.date.date.start,
    mornings,
    diet,
    device,
    published: logProps.published.formula.boolean,
    tweetUrl: logProps.tweetUrl.url,
    diary,
    hostsImage,
  };

  return logOutput;
};

export const getAllLogsDate = async () => {
  const logs = await getLogListFromNow(true);
  const dates = logs.tableData.map((log) => log.date);
  return dates;
};
