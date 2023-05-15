import React, { useEffect, useState } from "react";
import { LogListType } from "..";
import LogTable from "@/components/log/logListTable";
import { SERVER_URL } from "@/libs/server";
import { axiosWithApiAuth } from "../api/_apiAuth";

const TweetAdmin = () => {
  const [logData, setLogData] = useState<LogListType[]>();
  useEffect(() => {
    (async () => {
      const { data } = await axiosWithApiAuth.get(
        `${SERVER_URL()}/api/log/list?onlyPublished=false`
      );
      setLogData(data.tableData);
      console.log(data.tableData);
    })();
  }, []);

  return logData && <LogTable logList={logData} isAdmin={true} />;
};

export default TweetAdmin;
