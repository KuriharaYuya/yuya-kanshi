import React from "react";
import { LogOutPut } from "../../../../libs/notion/types";
import Image from "next/image";
import { convertToJST } from "@/libs/timeLib";
import { Paper } from "@mui/material";

type Props = {
  morningProps: LogOutPut["mornings"];
};

const MorningProps = ({ morningProps }: Props) => {
  const {
    morningActivityEstimatedTime,
    morningActivityTime,
    morningImage,
    morningActivityGapMinutes,
    morningActivityLastEdited,
    morningTargetPlace,
  } = morningProps;
  return (
    <Paper
      elevation={5}
      style={{ width: "95%", margin: "0 auto", marginBottom: "1rem" }}
    >
      <h2>朝の記録</h2>
      <div>
        <ul>
          <li>
            朝の開始予定時刻：
            <span style={{ fontWeight: "bold" }}>
              {convertToJST(morningActivityEstimatedTime, "B")}に
              {morningTargetPlace}
            </span>
          </li>
          <li>
            実際の朝の活動開始時刻：
            <span style={{ fontWeight: "bold" }}>
              {convertToJST(morningActivityTime, "B")}
            </span>
          </li>
          <li>
            予想とのギャップ：
            <span style={{ fontWeight: "bold" }}>
              {morningActivityGapMinutes}
            </span>
          </li>
          <li>
            朝の到着予定データの最終編集時刻：
            <span style={{ fontWeight: "bold" }}>
              {convertToJST(morningActivityLastEdited, "B")}
            </span>
          </li>
        </ul>
        <br />
        <ul>
          チェックリスト
          <li>不正がないか？編集時刻が前日の夜以前になっているか？</li>
        </ul>
        証明写真
        <br />
        <Image
          src={morningImage}
          alt="proof-image"
          width={302 * 0.8}
          height={403 * 0.8}
          style={{ margin: "0 auto", display: "block" }}
        />
        <ul>
          チェックリスト
          <li>場所を証明しているか？？</li>
          <li>朝の活動開始時刻を証明しているか？？</li>
        </ul>
      </div>
    </Paper>
  );
};

export default MorningProps;
