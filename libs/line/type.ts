export interface LineEvent {
  type: string;
  replyToken: string;
  source: {
    userId: string;
    type: string;
  };
  timestamp: number;
  message: {
    type: string;
    id: string;
    text: string;
  };
}

export interface MessageProp {
  type: "ステータス" | "投稿";
  dateIso: string;
}

export type LogStatus =
  | "投稿済み"
  | "準備完了"
  | "準備未完了"
  | "不明"
  | "存在しない";
