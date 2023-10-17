import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

interface NotFoundProps {}

const NotFoundPage: React.FC<NotFoundProps> = ({}) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Typography>404 Not Found</Typography>
      </div>
    </React.Fragment>
  );
};

export default NotFoundPage;
