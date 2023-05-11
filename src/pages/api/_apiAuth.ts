import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export const authUser = (req: NextApiRequest, res: NextApiResponse) => {
  const isAuth =
    req.headers.authorization ==
    `Bearer ${process.env.NEXT_PUBLIC_USER_AUTH_TOKEN}`;
  if (!isAuth) {
    res.status(401).json({ message: "Unauthorized" });
    return false;
  }
  return true;
};

export const axiosWithApiAuth = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_AUTH_TOKEN}`,
  },
});
