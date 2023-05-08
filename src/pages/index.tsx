import Router from "next/router";
import React from "react";

const DashBoard = () => {
  const onClickDateHandler = () => {
    Router.push("/logs/2023-05-07");
  };
  return <button onClick={onClickDateHandler}>index</button>;
};

export default DashBoard;
