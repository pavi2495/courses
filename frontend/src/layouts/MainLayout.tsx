import React, { useEffect, useState } from "react";
// import { Helmet } from 'react-helmet';

// MATERIAL UI
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar, IconButton, Stack, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// CUSTOM ICONS
import { CMSUICtx } from "../UIProvider";
import CMSCustomDrawer from "./CMSCustomDrawer";

const drawerWidth = 260;

const Main = styled("div", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  padding: theme.spacing(0),
  position: "relative",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface MainLayoutProps {
  permissions?: string[];
  currentPage?: string;
  children?: React.ReactNode;
  window?: () => Window;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  currentPage,
  children,
  window,
}) => {
  const { windowSize } = React.useContext(CMSUICtx);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleDrawerToogle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleSmallScreenDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", flex: 1, background: "white" }}>
      <CssBaseline />
      <CMSCustomDrawer
        open={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        onToggleDisplay={handleDrawerToogle}
        currentPage={currentPage}
        drawerExtraProps={{
          PaperProps: {
            sx: {
              display: "block",
              "&::-webkit-scrollbar": {
                width: 5,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#00205B",
                borderRadius: 1,
              },
            },
          },
          sx: {
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              backgroundColor: "#0D1116",
              borderRadius: " 0px 10px 10px 0px",
            },
          },
          variant: "permanent",
          open: drawerOpen,
        }}
      />

      {/* //////////////////////////////////////////////////////////////////////// */}
      {/* ////                           PAGE CONTENT                         //// */}
      {/* //////////////////////////////////////////////////////////////////////// */}
      <Main id="CMS-main-layout" open={drawerOpen}>
        {children}
      </Main>
    </Box>
  );
};
// };

export default MainLayout;
