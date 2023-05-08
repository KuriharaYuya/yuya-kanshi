import axios from "axios";
import { LogOutPut } from "../../../libs/notion/types";
import { useEffect, useState } from "react";
import DisplayLog from "@/components/LogDetail";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  // tokeをリクエストのヘッダーに入れる
  const { logDate } = router.query;
  const [logData, setLogData] = useState<LogOutPut>();
  useEffect(() => {
    if (!logDate) return;
    (async () => {
      const { data }: { data: LogOutPut } = await axios.get(
        `http://localhost:3000/api/log?date=${logDate}`
      );
      setLogData(data);
    })();
  }, [logDate]);

  return logData && <DisplayLog logOutput={logData} />;
}
