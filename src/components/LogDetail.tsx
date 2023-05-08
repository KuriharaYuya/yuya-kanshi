import Image from "next/image";
import { LogOutPut } from "../../libs/notion/types";

type Props = {
  logOutput: LogOutPut;
};

const DisplayLog = ({ logOutput }: Props) => {
  return (
    <div>
      <ul>
        <li>
          <h3>{logOutput.date}</h3>
          <ul>
            <li>
              <h4>朝の活動開始予定時刻と場所</h4>
              <ul>
                <li>
                  最終編集時刻：{logOutput.mornings.morningActivityLastEdited}
                </li>
                <li>
                  改ざんされていないか？前日の夜の段階から変化していないか？？
                </li>
              </ul>
            </li>
            <li>
              実際の朝の活動開始時刻：{logOutput.mornings.morningActivityTime}
            </li>
            <li>
              証明写真
              <br />
              ズレがないか
            </li>
            <Image
              src={logOutput.mornings.morningImage}
              alt="proof-image"
              width={200}
              height={200}
            />
            <li>
              予想とのギャップ：{logOutput.mornings.morningActivityGapMinutes}
            </li>
          </ul>
        </li>
        <li>
          <h3>デバイス</h3>
          <ul>
            <li>
              月次スクリーンタイム目標上限時間：
              {logOutput.device.monthlyScreenTime}分
            </li>
            <li>スクリーンタイム分数：{logOutput.device.todayScreenTime}分</li>
            <li>
              証明写真
              <Image
                src={logOutput.device.screenTime}
                alt="proof-image"
                width={200}
                height={200}
              />
              <br />
              撮影時間が日付が回っていたケース
              <br />
              前日のスクリーンタイムを写しているか？？
              <br />
              日付が回っていないケース
              <br />
              投稿する必要なし。次の日に投稿する。その場合twitterへの自動投稿も保留にしておく
            </li>
            <li>gap：{logOutput.device.screenTimeGapMinutes}分</li>
          </ul>
        </li>
        <li>
          <h3>ダイエット</h3>
          <ul>
            <li>
              月次目標カロリー
              <br />
              上限か下限か
            </li>
            <li>今日の摂取カロリー：{logOutput.diet.todayCalorie}kcal</li>
            <li>gap：{logOutput.diet.todayCalorieGap}kcal</li>
            <br />
            証明写真
            <Image
              src={logOutput.diet.myFitnessPal}
              alt="proof-image"
              width={200}
              height={200}
            />
          </ul>
        </li>
      </ul>
    </div>
  );
};
export default DisplayLog;
