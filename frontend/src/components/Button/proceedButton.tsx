import { Button, ButtonProps, styled } from "@mui/material";
import { defaultColorTemplate } from "../../UIProvider";

interface CustomButtonProps extends ButtonProps {
  isSaveDisabled?: boolean;
}

export const ProceedButton = styled(Button)<CustomButtonProps>(
  ({ theme, isSaveDisabled }) => ({
    "&.MuiButton-root": {
      minWidth: "150px",
      background: "#00205B",
      color: "white",
      fontFamily: "'Poppins', normal",
      textTransform: "none",
      fontSize: "12px",
      width: "auto",
      padding: "10px 50px",
      "&:hover": {
        background: defaultColorTemplate.mainColorHover,
      },
      // Use the isSaveDisabled prop to conditionally apply styles
      ...(isSaveDisabled && {
        background: "#ccc", // Change the background color when disabled
        pointerEvents: "none", // Disable pointer events when disabled
      }),
    },
  })
);
