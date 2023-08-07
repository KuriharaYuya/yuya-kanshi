import { S3 } from "aws-sdk";
import fs from "fs";

// AWS の設定
const s3 = new S3({
  region: "ap-northeast-1",
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
});

export async function uploadImageToS3(
  filePath: string,
  date: string,
  index: number
): Promise<string> {
  const fileName = `${date}_${index}.jpeg`;

  // ファイルの内容をBufferとして読み込む
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: "yuya-kanshi",
    Key: `images/${fileName}`,
    Body: fileContent,
    ContentType: "image/jpeg",
  };

  try {
    const response = await s3.upload(params).promise();
    return response.Location;
  } catch (error) {
    // 詳細なエラー内容は error.message に格納されている
    // @ts-ignore
    throw new Error(error.message);
  }
}
