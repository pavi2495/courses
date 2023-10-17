import { styled, Button } from "@mui/material";
import { defaultColorTemplate } from "../../UIProvider";

export const CancelButton = styled(Button)({
  "&.MuiButton-root": {
    minWidth: "150px",
    background: defaultColorTemplate.mainColor,
    color: "white",
    fontFamily: "'Poppins', normal",
    textTransform: "none",
    fontSize: "12px",
    width: "auto",
    padding: "10px 50px",
    "&:hover": {
      background: "#181F28",
    },
  },
});
