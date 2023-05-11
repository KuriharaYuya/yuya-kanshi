export const convertToJST = (
  dateTimeString: string,
  formatType: "A" | "B"
): string => {
  const date = new Date(dateTimeString);

  // クライアント側でのみ実行される場合
  if (typeof window !== "undefined") {
    const clientOffset = new Date().getTimezoneOffset() / 60;
    date.setHours(date.getHours() + 9 + clientOffset);
  } else {
    date.setUTCHours(date.getUTCHours() + 9);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (formatType === "A") {
    return `${year}年${month}月${day}日`;
  } else {
    return `${month}月${day}日${hours}時${minutes}分`;
  }
};
