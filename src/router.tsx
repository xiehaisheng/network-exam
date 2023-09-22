import React, { useMemo, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { IfElseControl } from "./components/control";
import { LayoutBlank } from "./components/layout/blank";
import { LayoutCommon } from "./components/layout/common";

export const Router = () => {
  const history = useHistory();
  const location = useLocation();
  const [pageStatus, setPageStatus] = useState<null | "404" | "error">(null);
  let PageComponent = useMemo(() => {
    let pagePath = location.pathname;
    if (/^\/workbench/.test(pagePath)) {
      document.title = "工作台";
    }
    if (/^\/personal/.test(pagePath)) {
      document.title = "个人中心";
    }
    if (pagePath === "/") {
      history.push("/workbench");
      pagePath = "/workbench";
    }
    setPageStatus(null);

    return React.lazy(() =>
      import(`./pages/${pagePath.substring(1)}`).catch((err) => {
        console.error(err);

        setPageStatus(
          String(err).indexOf("Cannot find module") !== -1 ? "404" : "error"
        );
      })
    );
  }, [location.pathname]);

  if (pageStatus) {
    const _PageComponent = React.lazy(() => import("./pages/error"));

    PageComponent = (() => (
      <_PageComponent status={pageStatus}></_PageComponent>
    )) as any;
  }

  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <IfElseControl
        when={["/home", "/exam", "/login", "/personal"].includes(
          location.pathname
        )}
        else={
          <LayoutBlank>
            <PageComponent></PageComponent>
          </LayoutBlank>
        }
      >
        <LayoutCommon>
          <PageComponent></PageComponent>
        </LayoutCommon>
      </IfElseControl>
    </React.Suspense>
  );
};
