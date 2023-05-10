export const SERVER_URL = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://yuya-kanshi.vercel.app/";
  } else {
    return "http://localhost:3000";
  }
};
