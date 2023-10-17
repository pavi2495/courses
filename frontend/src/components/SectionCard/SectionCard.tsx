import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Box, CardContent, styled, Typography } from "@mui/material";

import { defaultColorTemplate } from "../../UIProvider";
import { FlexRow } from "../Flex/Flex";
import { ReactNode } from "react";

export type SectionCardProps = {
  id?: string;
  header?: string;
  disableEditing?: boolean;
  openEditModal?: () => void;
  openAddModal?: () => void;
  padding?: string;
  background?: string;
  minHeight?: string;
  enableRelativePosition?: boolean;
  children?: ReactNode;
};

const StyledSectionCard = styled("div")(({ theme }) => ({
  flex: 1,
  border: "none",
  margin: "4px", // Important so shadows are visible
  position: "relative",
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  position: "relative",
  flex: 1,
  borderRadius: "15px",
  background: "white",
  filter: "drop-shadow(0px 0px 5px #ECECEC)",
}));

const StyledEditIcon = styled(EditIcon)({
  fontSize: "10px",
});
const StyledAddIcon = styled(AddIcon)({
  fontSize: "15px",
});

const SectionCardContent = styled("div")(({ theme }) => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
}));

const SectionCard: React.FC<SectionCardProps> = ({
  id,
  header,
  padding,
  disableEditing,
  openEditModal,
  openAddModal,
  children,
  background,
  minHeight,
  enableRelativePosition,
}) => {
  return (
    <StyledSectionCard sx={{ minHeight: minHeight }}>
      <SectionCardContent
        sx={{
          position: enableRelativePosition ? "relative" : "absolute",
        }}
        id={id}
      >
        <FlexRow
          id="SectionCardFlexRow"
          sx={{ minHeight: "30px", maxHeight: "30px", alignItems: "center" }}
        >
          <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>
            {header}
          </Typography>
          {!disableEditing && openEditModal && (
            <Box
              id={"SectionCardEditBox"}
              data-html2canvas-ignore="true"
              justifyContent="center"
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                borderRadius: "4px",
                marginLeft: "12px",
                color: "white",
                backgroundColor: defaultColorTemplate.mainColor,
                height: "16px",
                width: "16px",
                cursor: "pointer",
                "&:hover": {
                  background: "hsla(226, 99%, 64%, 0.85)",
                },
              }}
              onClick={openEditModal}
            >
              <StyledEditIcon />
            </Box>
          )}
          {!disableEditing && openAddModal && (
            <Box
              id={"SectionCardAddBox"}
              data-html2canvas-ignore="true"
              justifyContent="center"
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                borderRadius: "4px",
                marginLeft: "8px",
                color: "white",
                backgroundColor: defaultColorTemplate.mainColor,
                height: "16px",
                width: "16px",
                cursor: "pointer",
                "&:hover": {
                  background: "hsla(226, 99%, 64%, 0.85)",
                },
              }}
              onClick={openAddModal}
            >
              <StyledAddIcon />
            </Box>
          )}
        </FlexRow>
        <StyledCardContent
          sx={{ padding: padding || "0px", background: background || "white" }}
        >
          {children}
        </StyledCardContent>
      </SectionCardContent>
    </StyledSectionCard>
  );
};

export default SectionCard;
