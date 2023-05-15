import { Checkbox, Paper } from "@mui/material";
import React from "react";
import { LogOutPut } from "../../../../libs/notion/types";
import Image from "next/image";
type Props = {
  hostsImageProps: LogOutPut["hostsImage"];
};

const HostImageProps = ({ hostsImageProps }: Props) => {
  return (
    <Paper
      elevation={5}
      style={{ width: "95%", margin: "0 auto", marginBottom: "1rem" }}
    >
      <h4>
        PCでSNSなどを見すぎてしまわないよう、hostsファイルによってOSレベルで各サイトのドメインをブロックしています
      </h4>
      <div>
        <p>
          最後にhostsファイルを編集した日時(wheel以降)と、その時の現在時刻(日本語部分)とファイル内容
        </p>
        <Image
          src={hostsImageProps.hostsLastEditedImage}
          alt="proof-image"
          width={300 * 1.5}
          height={200 * 1.5}
          style={{ margin: "0 auto", display: "block" }}
        />
        <p>
          最後にhostsファイルを編集したのがいつか+現在時刻のスクリーンショット
        </p>
        <p>
          hostsファイルが最終編集時刻から一度も編集されていないことを保証しています。
        </p>
        <ul>
          <li>
            上記画像のwheel以降の日付と本画像のwheel以降の日付が合致していることを確認してください
          </li>
          <li>本画像の現在時刻が今日の日付であることを確認してください</li>
        </ul>
        <Image
          src={hostsImageProps.todayHostsImage}
          alt="proof-image"
          width={300 * 1.5}
          height={65 * 1.5}
          style={{ margin: "0 auto", display: "block" }}
        />
      </div>
    </Paper>
  );
};

export default HostImageProps;
