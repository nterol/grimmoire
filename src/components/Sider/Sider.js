import React, { lazy, Suspense } from "react";

import Header from "./Header";

const SubjectPage = lazy(() => import("./SubjectPage"));
const ProfilePage = lazy(() => import("./ProfilePage"));
const LinkInfo = lazy(() => import("./LinkInfo"));

const Body = ({ whichNode, isLink }) => {
  if (isLink) return <LinkInfo />;
  else if (whichNode === "person") return <ProfilePage />;
  else if (whichNode === "subject") return <SubjectPage />;
};

const Sider = ({ linkView, nodeView: { nodeId, type } }) => {
  return (
    <div className="section sider-section">
      <div className="container sider-content">
        <Header id={nodeId ? nodeId : "subject"} />
        <Suspense fallback={<div>Loading...</div>}>
          <Body whichNode={type} isLink={linkView} />
        </Suspense>
      </div>
    </div>
  );
};

export default Sider;
