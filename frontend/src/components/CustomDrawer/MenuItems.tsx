import {
  Collapse,
  Grid,
  ListItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";
import { Location as RouterLocation } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { defaultColorTemplate } from "../../UIProvider";

const TypographyMultilevelTextTitle = styled(Typography)(() => ({
  fontSize: "12px",
  lineHeight: "18px",
  fontWeight: 500,
  flex: 1,
  fontFamily: "'Poppins', normal",
  letterSpacing: "0.1em",
  color: "#FFFFFF",
}));

export enum MenuItemTitleType {
  LINK = "LINK",
  TEXT = "TEXT",
}

export const MenuItemTitle: React.FC<{
  text?: string;
  type?: MenuItemTitleType;
}> = ({ text, type = MenuItemTitleType.LINK }) => {
  if (type === MenuItemTitleType.TEXT) {
    return (
      <TypographyMultilevelTextTitle>{text}</TypographyMultilevelTextTitle>
    );
  }
  return <TypographyMultilevelLinkTitle>{text}</TypographyMultilevelLinkTitle>;
};

const TypographyPosition = styled(Grid)(() => ({
  fontSize: 10,
  lineHeight: "15px",
  fontWeight: 500,
  fontFamily: "Poppins",
  color: "#FFFFFF",
  opacity: 0.4,
}));

const TypographyMultilevelLinkTitle = styled(Typography)(() => ({
  paddingLeft: "10px",
  fontFamily: "'Poppins', normal",
  fontWeight: "500",
  fontSize: "14px",
  lineHeight: "21px",
  display: "flex",
  alignItems: "center",
  color: "#FFFFFF",
}));

const TypographyNavList = styled(Typography)(() => ({
  fontSize: "14px",
  lineHeight: "18px",
  fontWeight: 500,
  fontFamily: "'Poppins', normal",
  marginLeft: "20px",
  color: "#FFFFFF",
  flex: 1,
}));

const StyledListItem = styled(ListItem)({
  padding: "0px",
  cursor: "pointer",
  justifyContent: "center",
  "&:hover": {
    borderRadius: "10px",
  },
});

export const SingleLevel: React.FC<{
  id?: string;
  item: any;
  currentPage?: string;
  onClick?: () => void;
  endPoint: string;
  subLevel?: boolean;
  drawerOpen?: boolean;
  location: RouterLocation;
}> = ({ id, item, onClick, endPoint, subLevel, drawerOpen, location }) => {
  return (
    <StyledListItem onClick={onClick}>
      <Stack
        id={id}
        direction={"row"}
        sx={{
          position: "relative",
          flex: drawerOpen ? 1 : "none",
          padding: drawerOpen ? "0px 10px" : "0px 15px",
          borderRadius: "10px",
          justifyContent: drawerOpen ? "flex-start" : "center",
          height: "50px",
          alignItems: "center",
          background:
            location.pathname === endPoint && location.search === ""
              ? defaultColorTemplate.mainColor
              : null,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          "&:hover": {
            background:
              location.pathname === endPoint && location.search === ""
                ? defaultColorTemplate.mainColor
                : "#181f28",
            borderRadius: "10px",
          },
        }}
      >
        {item.icon}
        {drawerOpen && (
          <div
            style={{
              marginRight: "15px",
              wordWrap: "break-word",
              overflow: "hidden",
            }}
          >
            <TypographyNavList
              sx={{
                fontSize: subLevel ? "12px" : "14px",
              }}
            >
              {item.title}
            </TypographyNavList>
          </div>
        )}
      </Stack>
    </StyledListItem>
  );
};

interface MultiLevelProps {
  item: {
    icon?: ReactNode;
    title?: string;
    subTitle?: string;
    type?: MenuItemTitleType;
  };
  currentPage?: any;
  endpoint?: string;
  menuItemOpen: boolean;
  drawerOpen: boolean;
  setDrawerOpen?: (open: boolean) => void;
  onToggleDisplay: () => void;
  location: RouterLocation;
  children?: React.ReactNode;
}

export const MultiLevel: React.FC<MultiLevelProps> = ({
  children,
  currentPage,
  endpoint,
  menuItemOpen,
  drawerOpen,
  setDrawerOpen,
  item,
  onToggleDisplay,
  location,
}) => {
  const handleClick = () => {
    if (!drawerOpen && setDrawerOpen) {
      setTimeout(() => {
        setDrawerOpen(true);
      }, 100);
    }
    onToggleDisplay();
  };

  return (
    <React.Fragment>
      <StyledListItem onClick={handleClick} style={{ marginTop: 0 }}>
        <Stack
          direction={"row"}
          sx={{
            flex: drawerOpen ? 1 : "none",
            padding: drawerOpen ? "none" : "0px 15px",
            borderRadius: "10px",
            justifyContent: drawerOpen ? "flex-start" : "center",
            height: "50px",
            alignItems: "center",
            background:
              location.pathname === endpoint && location.search === ""
                ? defaultColorTemplate.mainColor
                : null,
            pr: 1,
            display: "flex",
          }}
        >
          {item.icon && (
            <Stack direction="column" flex={2}>
              {item.icon}
            </Stack>
          )}

          <Stack
            direction="column"
            sx={{
              flex: 9,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {drawerOpen && <MenuItemTitle text={item.title} type={item.type} />}
            {drawerOpen && (
              <TypographyPosition sx={{ pl: 1 }}>
                {item.subTitle}
              </TypographyPosition>
            )}
          </Stack>
          <Stack
            flex={2}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              maxWidth: "20px",
            }}
          >
            {drawerOpen && menuItemOpen && (
              <ExpandLessIcon
                style={{ color: "white", margin: 0, maxWidth: "20px" }}
              />
            )}
            {drawerOpen && !menuItemOpen && (
              <ExpandMoreIcon style={{ color: "white", margin: 0 }} />
            )}
          </Stack>
        </Stack>
      </StyledListItem>
      {drawerOpen && (
        <Collapse in={menuItemOpen} timeout="auto" unmountOnExit>
          <Stack id="CMSCustomDrawerMultiLevelChildren">{children}</Stack>
        </Collapse>
      )}
    </React.Fragment>
  );
};
