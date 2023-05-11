import { LogOutPut } from "../../../libs/notion/types";
import { useEffect, useState } from "react";
import DisplayLog from "@/components/log/LogDetail";
import { useRouter } from "next/router";
import { getAllLogsDate, getLogDetail } from "../../../libs/notion/log";
import { GetStaticProps, GetStaticPaths } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const logDates = await getAllLogsDate();

  const paths = logDates.map((logDate) => ({
    params: { logDate },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const logDate = params?.logDate as string;

  const logData: LogOutPut = await getLogDetail(logDate);

  if (!logData) {
    return { notFound: true };
  }

  return {
    props: {
      logData,
    },
    revalidate: 60,
  };
};

const LogPage = ({ logData }: { logData: LogOutPut }) => {
  return <DisplayLog logOutput={logData} />;
};

export default LogPage;
