import Router from "next/router";
import React, { useEffect, useState } from "react";
import Calender from "react-github-contribution-calendar";
import axios from "axios";
import {
  LogListPropertyForGitLikeCalender,
  LogTableProperty,
} from "../../libs/notion/types";
import DenseTable from "@/components/logListTable";
import { LogListOutPut, getLogListFromNow } from "../../libs/notion/logList";
import { GetStaticProps } from "next";

export type LogListType = {
  uuid: string;
  date: string;
  title: string;
  tweetUrl: string;
};

export const getStaticProps: GetStaticProps = async () => {
  // const { data }: { data: LogListOutPut } = await axios.get(
  //   "http://localhost:3000/api/log/list"
  // );
  const data = await getLogListFromNow();

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
  const [values, setValues] = useState<{ [date: string]: number }>(
    calenderData
  );
  const [logList, setLogList] = useState<LogListType[]>(tableData);

  const until = new Date().toISOString().split("T")[0];

  const weekLabelAttributes = {
    fill: "#21ba29",
    fontSize: "11px",
  };
  const monthLabelAttributes = {
    fill: "#d22020",
    fontSize: "13px",
  };
  const panelAttributes = {
    strokeWidth: 0.5,
    stroke: "#49259c",
  };

  return (
    <div>
      {values && (
        <Calender
          values={values}
          until={until}
          weekLabelAttributes={weekLabelAttributes}
          monthLabelAttributes={monthLabelAttributes}
          panelAttributes={panelAttributes}
        />
      )}
      <div>{logList && <DenseTable logList={logList} />}</div>
    </div>
  );
};

export default DashBoard;
