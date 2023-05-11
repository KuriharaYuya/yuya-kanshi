import React from "react";
import { LogOutPut } from "../../../../libs/notion/types";
import Image from "next/image";

type Props = {
  deviceProps: LogOutPut["device"];
};

const DeviceProps = ({ deviceProps }: Props) => {
  return (
    <li>
      <h3>デバイス</h3>
      <ul>
        <li>
          月次スクリーンタイム目標上限時間：
          {deviceProps.monthlyScreenTime}分
        </li>
        <li>本日にスクリーンタイム分数：{deviceProps.todayScreenTime}分</li>
        <li>
          証明写真
          <Image
            src={deviceProps.screenTime}
            alt="proof-image"
            width={200}
            height={200}
          />
          <br />
          スクリーンタイムのスクショの撮影時刻が日付が回っていない時刻であるケースについて:
          その場合はその日はこのwebサイトへの投稿も、twitterへの自動投稿も保留にするシステムになっています。仮に午後22時の段階のスクショを投稿した場合、そこから2時間スマホをいじることができてしまうからです。必ず日付がまわってからきっかり24hぶん記録されてから投稿します。
          <br />
          前日のスクリーンタイムを写しているか？？
          <br />
          日付が回っていないケース
          <br />
          投稿する必要なし。次の日に投稿する。その場合twitterへの自動投稿も保留にしておく
        </li>
        <li>
          月次の一日のスクリーンタイム目標上限時間との差分：
          {deviceProps.screenTimeGapMinutes}分
        </li>
      </ul>
    </li>
  );
};

export default DeviceProps;
