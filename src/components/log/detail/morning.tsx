import React from "react";
import { LogOutPut } from "../../../../libs/notion/types";
import Image from "next/image";
import { convertToJST } from "@/libs/timeLib";

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
    <div>
      <h2>朝の記録</h2>
      {morningTargetPlace}
      <div>
        <h4>朝の活動開始予定時刻と場所、証明方法</h4>
        <ul>
          <li>
            朝の開始予定時刻：{convertToJST(morningActivityEstimatedTime, "B")}
          </li>
          <li>
            実際の朝の活動開始時刻：{convertToJST(morningActivityTime, "B")}
          </li>
          <li>予想とのギャップ：{morningActivityGapMinutes}分</li>
          <li>
            証明写真
            <br />
          </li>
          <Image
            src={morningImage}
            alt="proof-image"
            width={200}
            height={200}
          />
        </ul>
        <ul>
          チェックリスト
          <li>場所を証明しているか？？</li>
          <li>朝の活動開始時刻を証明しているか？？</li>
        </ul>
      </div>

      <ul>
        <li>
          朝の到着予定データの最終編集時刻：
          {convertToJST(morningActivityLastEdited, "B")}
        </li>
      </ul>
      <ul>
        チェックリスト
        <li>不正がないか？編集時刻が前日の夜以前になっているか？</li>
      </ul>
    </div>
  );
};

export default MorningProps;
