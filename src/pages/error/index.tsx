import React from "react";
import { ErrorBlock, Space } from "antd-mobile";

export default function (props: { status?: string }) {
  return (
    <>
      {props.status === "404" ? (
        <ErrorBlock status="empty" />
      ) : (
        <ErrorBlock status="default" />
      )}
    </>
  );
}
