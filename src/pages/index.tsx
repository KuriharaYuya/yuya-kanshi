import Router from "next/router";
import React, { useEffect, useState } from "react";
import Calender from "react-github-contribution-calendar";
import axios from "axios";
import {
  LogListPropertyForGitLikeCalender,
  LogTableProperty,
} from "../../libs/notion/types";
import DenseTable from "@/components/logListTable";
import { LogListOutPut } from "../../libs/notion/logList";

export type LogListType = {
  uuid: string;
  date: string;
  title: string;
  tweetUrl: string;
};

const DashBoard = () => {
  const [values, setValues] = useState<{ [date: string]: number }>();
  const [logList, setLogList] = useState<LogListType[]>();
  useEffect(() => {
    (async () => {
      const { data }: { data: LogListOutPut } = await axios.get(
        "http://localhost:3000/api/log/list"
      );
      if (!data) return;
      const { calenderData, tableData } = data;
      setValues(calenderData);
      setLogList(tableData);
    })();
  }, []);

  // isostringで今日を表現する
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
