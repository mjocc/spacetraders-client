import Head from "next/head";
import { FC } from "react";

const ErrorPage: FC<{ errorCode: number; errorText: string }> = ({
  errorCode,
  errorText,
}) => (
  <>
    <Head>
      <title>
        Error {errorCode}: {errorText}
      </title>
    </Head>
    <div
      style={{
        paddingTop: "58px",
        paddingBottom: "122px",
        paddingLeft: "calc(16.666667%)",
        zIndex: -1,
      }}
      className="position-absolute d-flex top-0 start-0 w-100 h-100 justify-content-center align-items-center h-100 w-100"
    >
      <div className="border rounded-3 p-4 d-flex flex-column justify-content-center align-items-center">
        <h1 className="fw-bold display-1">{errorCode}</h1>
        <h2 className="h4">{errorText}</h2>
      </div>
    </div>
  </>
);

export default ErrorPage;
