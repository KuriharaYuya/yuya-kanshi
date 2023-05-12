import React from "react";
import { LogOutPut } from "../../../../libs/notion/types";
import Image from "next/image";
import styled from "./section.module.scss";
import { Paper } from "@mui/material";

type Props = {
  deviceProps: LogOutPut["device"];
};

const DeviceProps = ({ deviceProps }: Props) => {
  return (
    <Paper
      elevation={5}
      style={{ width: "95%", margin: "0 auto", marginBottom: "1rem" }}
    >
      <h3>デバイス</h3>
      <ul>
        <li>
          月次スクリーンタイム目標上限時間：
          <span style={{ fontWeight: "bold" }}>
            {deviceProps.monthlyScreenTime}分
          </span>
        </li>
        <li>
          本日にスクリーンタイム分数：
          <span style={{ fontWeight: "bold" }}>
            {deviceProps.todayScreenTime}分
          </span>
        </li>
        <li>
          月次の一日のスクリーンタイム目標上限時間との差分：
          <span style={{ fontWeight: "bold" }}>
            {deviceProps.screenTimeGapMinutes}分
          </span>
        </li>
      </ul>
      証明写真
      <Image
        src={deviceProps.screenTime}
        alt="proof-image"
        width={117 * 2.3}
        height={253 * 2.3}
        style={{ margin: "0 auto", display: "block" }}
      />
      <ul>
        チェックリスト
        <li>前日のスクリーンタイムを写しているか？？</li>
      </ul>
      <br />
      <p>
        スクリーンタイムのスクショの撮影時刻が日付が回っていない時刻であるケースについて:
        <span style={{ fontWeight: "bold" }}>
          その場合その日はこのwebサイトとtwitterへの自動投稿を保留にするシステムになっています。仮に午後22時の段階のスクショを投稿した場合、そこから2時間スマホをいじることができてしまうからです。必ず日付がまわってからきっかり24h分の記録が表示されてから投稿します。
        </span>
      </p>
    </Paper>
  );
};

export default DeviceProps;
