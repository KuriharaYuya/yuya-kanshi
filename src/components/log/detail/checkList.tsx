import { Checkbox, Paper } from "@mui/material";
import React from "react";
import { LogOutPut } from "../../../../libs/notion/types";
type Props = {
  diaryProps: LogOutPut["diary"];
};

const CheckListProps = ({ diaryProps }: Props) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Paper
      elevation={5}
      style={{ width: "95%", margin: "0 auto", marginBottom: "1rem" }}
    >
      <p>忘れがちなチェックリストです</p>
      <div>
        <span>今日のコミュニケーション振り返りをnotionにて行ったか</span>
        <Checkbox {...label} checked={diaryProps.isChatLogDone} />
      </div>
      <div>
        <span>今日の自分用日報の記述をnotionにて行ったか</span>
        <Checkbox {...label} checked={diaryProps.isDiaryDone} />
      </div>
    </Paper>
  );
};

export default CheckListProps;
