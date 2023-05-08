import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LogTableProperty } from "../../libs/notion/types";
import { LogListType } from "@/pages";
import Link from "next/link";
import Router from "next/router";

export default function DenseTable({ logList }: { logList: LogListType[] }) {
  const onClickDateHandler = () => {
    Router.push("/logs/2023-05-07");
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>タイトル</TableCell>
            <TableCell align="right">日付</TableCell>
            <TableCell align="right">twitter URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logList.map((log) => (
            <TableRow
              key={log.uuid}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">
                <Link href="#" onClick={onClickDateHandler}>
                  {log.title}
                </Link>
              </TableCell>
              <TableCell align="right">{log.date}</TableCell>
              <TableCell align="right">{log.tweetUrl}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
