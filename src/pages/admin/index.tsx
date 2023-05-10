import React, { useEffect, useState } from "react";
import { LogListType } from "..";
import LogTable from "@/components/logListTable";
import axios from "axios";
import { SERVER_URL } from "@/libs/server";

const TweetAdmin = () => {
  const [logData, setLogData] = useState<LogListType[]>();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${SERVER_URL()}/api/log/list?onlyPublished=false`
      );
      setLogData(data.tableData);
    })();
  }, []);

  return logData && <LogTable logList={logData} isAdmin={true} />;
};

export default TweetAdmin;
