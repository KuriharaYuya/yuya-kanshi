import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LogListType } from "@/pages";
import Link from "next/link";
import Router from "next/router";
import { Checkbox, Chip, Modal, Pagination } from "@mui/material";
import { callExecTweetApi } from "@/pages/api/tweet/execTweet";
import style from "./logListTable.module.scss";

export default function LogTable({
  logList,
  isAdmin,
}: {
  logList: LogListType[];
  isAdmin: boolean;
}) {
  const onClickDateHandler = (isoString: string) => {
    Router.push(`/logs/${isoString}`);
  };
  const checkBoxLabel = { inputProps: { "aria-label": "Checkbox demo" } };

  const [tweetConfirmModalOpen, setTweetConfirmModalOpen] = useState(false);
  const [tgtTweet, setTgtTweet] = useState<LogListType>();
  const onClickTweetHandler = (log: LogListType) => {
    setTweetConfirmModalOpen(true);
    setTgtTweet(log);
  };

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
          <TableHead className={style.logListTable}>
            <TableRow>
              {isAdmin && <TableCell>Published?</TableCell>}
              {isAdmin && <TableCell>Tweeted</TableCell>}
              <TableCell>タイトル</TableCell>
              <TableCell className={style.date}>日付</TableCell>
              <TableCell align="right">Twitter URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logList
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((log) => (
                <TableRow
                  key={log.uuid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {isAdmin && (
                    <TableCell component="th" scope="row">
                      <Checkbox
                        {...checkBoxLabel}
                        checked={log.published}
                        aria-label="published"
                      />
                    </TableCell>
                  )}
                  {isAdmin && (
                    <TableCell component="th" scope="row">
                      <Checkbox
                        onChange={() => onClickTweetHandler(log)}
                        {...checkBoxLabel}
                        checked={!!log.tweetUrl}
                        aria-label="tweeted"
                      />
                    </TableCell>
                  )}
                  <TableCell align="right">
                    <Chip
                      label={log.title}
                      onClick={() => onClickDateHandler(log.date)}
                    />
                  </TableCell>
                  <TableCell style={{ width: "auto" }}>{log.date}</TableCell>
                  <TableCell align="right">
                    <a href={log.tweetUrl}>ツイートurl</a>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Pagination
          count={Math.ceil(logList.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </TableContainer>
      {tgtTweet && (
        <TweetConfirmModal
          log={tgtTweet}
          open={tweetConfirmModalOpen}
          handleClose={() => setTweetConfirmModalOpen(false)}
        />
      )}
    </>
  );
}

const TweetConfirmModal = ({
  log,
  open,
  handleClose,
}: {
  log: LogListType;
  open: boolean;
  handleClose: () => void;
}) => {
  const onClickTweetHandler = async () => {
    await callExecTweetApi(log.date);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <>
        <p>ツイートしますか？</p>
        <p>{log.date}</p>
        <p>{log.title}</p>
        <button onClick={onClickTweetHandler}>ツイートする</button>
      </>
    </Modal>
  );
};
