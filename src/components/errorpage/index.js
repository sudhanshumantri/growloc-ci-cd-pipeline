import React from "react";
import PageHeader from "../shared/page-header";

export const ErrorPage = () => {
  return (
    <>
      <PageHeader
        title="Page Not Found"
      />
      <div className="page-container">
        <span className="section-title">Error Page</span>
      </div>
    </>
  );
};
