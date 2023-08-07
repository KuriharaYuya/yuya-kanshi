import fetch from "node-fetch";
import { writeFile, unlink } from "fs";
import { promisify } from "util";
import { getLogDetail } from "../../../../libs/notion/log";
import { LogOutPut } from "../../../../libs/notion/types";
import { WRAPTAS_URL, notion } from "../../../../libs/notion/utils";
import { uploadImageToS3 } from "../../../../libs/aws/s3";
import { type } from "os";

export const appendContents = async (date: string) => {
  const data = await logData(date);
  //   titleならh2
  // textならtext
  // imageならimg
  //   const sections = Object.keys(data);
  let imageIndex = 0;
  for (const item of data.contents) {
    // 2秒待機する
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      switch (item.type) {
        case "title":
          await appendHeading(data.uuid, item.text!);
          break;
        case "text":
          await appendText(data.uuid, item.text!);
          break;
        case "image":
          imageIndex++;
          await appendImage(
            data.uuid,
            data.date,
            item.src as string,
            imageIndex
          );
          break;
        case "page":
          // ここにpageに関する非同期処理を追加
          break;
        case "toggleTitle":
          // ここにtoggleTitleに関する非同期処理を追加
          break;
        default:
          break;
      }
    } catch (e) {
      console.log(e, item);
    }
  }
  return `${WRAPTAS_URL}/${data.uuid}`;
};

const appendHeading = async (pageId: string, text: string) => {
  await notion.blocks.children.append({
    block_id: pageId,
    children: [
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [
            {
              type: "text",
              text: {
                content: text,
              },
            },
          ],
        },
      },
    ],
  });
};

const appendText = async (pageId: string, text: string) => {
  await notion.blocks.children.append({
    block_id: pageId,
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: text,
              },
            },
          ],
        },
      },
    ],
  });
};

const writeFileAsync = promisify(writeFile);
const unlinkAsync = promisify(unlink);

const appendImage = async (
  uuid: string,
  pageDate: string,
  src: string,
  index: number
) => {
  // まず、サーバにダウンロードするよ
  const downloadImage = async (src: string) => {
    const res = await fetch(src);
    const blob = await res.buffer(); // bufferを使用
    const fileName = `image.jpeg`;
    await writeFileAsync(fileName, blob);
    return fileName;
  };

  const deleteImage = async (fileName: string) => {
    // delete image.png
    await unlinkAsync(fileName);
  };
  const tgtFile = await downloadImage(src);
  const s3url = await uploadImageToS3(tgtFile, pageDate, index);
  await deleteImage(tgtFile);

  await notion.blocks.children.append({
    block_id: uuid,
    children: [
      {
        object: "block",
        type: "image",
        image: {
          type: "external",
          external: {
            url: s3url,
          },
        },
      },
    ],
  });
};

const returnPageContents = (log: LogOutPut) => {
  const { mornings, diet, device, workOut, hostsImage } = log;
  type Contents = {
    uuid: string;
    date: string;
    contents: {
      type: string;
      text?: string;
      src?: string;
      pageId?: string;
      image?: string;
    }[];
  };
  const data: Contents = {
    uuid: log.uuid,
    date: log.date,
    contents: [
      { type: "title", text: "朝の活動開始時間と証明方法" },
      { type: "text", text: mornings.morningActivityTime },
      { type: "text", text: "場所" },
      { type: "text", text: "証明写真" },
      {
        type: "image",
        src: mornings.morningImage,
      },
      { type: "text", text: "実際の時間より20分早い" },
      { type: "title", text: "一日の予定" },
      { type: "image", src: log.calenderPic },
      { type: "title", text: "スマホとpcの使いすぎ制限" },
      { type: "text", text: "スマホの使用時間" },
      { type: "text", text: device.todayScreenTime.toString() },
      { type: "text", text: "pcの使用時間" },
      { type: "text", text: "スマホの使用時間は目標より15分少ない" },
      { type: "title", text: "筋トレ" },
      { type: "text", text: "筋トレの証明写真" },
      { type: "image", src: workOut.gymLoginPic },
      { type: "page", src: workOut.pageId },
      { type: "title", text: "ホストの写真" },
      { type: "text", text: "ホストの写真" },
      { type: "image", src: hostsImage.todayHostsImage },
      { type: "text", text: "ホストの写真の変更理由" },
      { type: "image", src: hostsImage.hostsLastEditedImage },
      { type: "title", text: "食事" },
      { type: "text", text: "食事の証明写真" },
      { type: "image", src: diet.myFitnessPal },
      {
        type: "toggle",
        text: "それぞれの食事の証明写真",
        src: diet.myFitnessPal,
      },
    ],
  };
  return data;
};

const logData = async (date: string) => {
  const rawData = await getLogDetail(date);

  // @ts-ignore
  const data = returnPageContents(rawData!);
  return data;
};
export default appendContents;
