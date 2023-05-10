import React from "react";
import Calender from "react-github-contribution-calendar";
import LogTable from "@/components/logListTable";
import { LogListOutPut, getLogListFromNow } from "../../libs/notion/logList";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const data = await getLogListFromNow(false);

  if (!data) return { notFound: true };

  const { calenderData, tableData } = data;

  return {
    props: {
      calenderData,
      tableData,
    },
    revalidate: 60, // 60秒ごとに再生成
  };
};

const DashBoard = ({ calenderData, tableData }: LogListOutPut) => {
  const until = new Date().toISOString().split("T")[0];
  const { weekLabel, monthLabel, panel } = LabelDesigns;

  return (
    <div>
      <Calender
        values={calenderData}
        until={until}
        weekLabelAttributes={weekLabel}
        monthLabelAttributes={monthLabel}
        panelAttributes={panel}
      />
      <LogTable logList={tableData} isAdmin={false} />
    </div>
  );
};
const LabelDesigns = {
  weekLabel: {
    fill: "#21ba29",
    fontSize: "11px",
  },
  monthLabel: {
    fill: "#d22020",
    fontSize: "13px",
  },
  panel: {
    strokeWidth: 0.5,
    stroke: "#49259c",
  },
};

export type LogListType = {
  uuid: string;
  date: string;
  title: string;
  tweetUrl: string;
  published: boolean;
};
export default DashBoard;
