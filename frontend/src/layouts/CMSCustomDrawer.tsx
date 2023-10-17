import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// MATERIAL UI
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer, { DrawerProps } from "@mui/material/Drawer";
import { Stack, Typography } from "@mui/material";

// CUSTOM ICONS
import CustomProjectOverviewSVG from "../assets/svg/figma_project_overview";
import CustomWorkPackageSVG from "../assets/svg/figma_working_package";
import CustomSignOutSVG from "../assets/svg/figma_sign_out";
import CustomSupportSVG from "../assets/svg/figma_support";
import CustomProvileSVG from "../assets/svg/figma_profile";

// COMPONENTS
import { SingleLevel } from "../components/CustomDrawer/MenuItems";
import { CMSUICtx } from "../UIProvider";

const drawerWidth = 260;
const menuIconWidth = 20;
const menuIconHeight = 20;

const TypographyUserDetail = styled(Typography)(() => ({
  fontSize: "14px",
  lineHeight: "18px",
  fontWeight: 500,
  fontFamily: "'Poppins', normal",
  marginLeft: "20px",
  color: "#FFFFFF",
  flex: 1,
}));

const MinimizeMenuSVG: React.FC<{
  id?: string;
  onClick?: () => void;
  open: boolean;
}> = ({ id, onClick, open }) => {
  return (
    <Box
      id="CMSCustomDrawerMinimizeMenuSVG"
      component={"div"}
      sx={{
        position: "absolute",
        right: 0,
        top: 0,
        fill: "#242627",
        cursor: "pointer",
        "&:hover": {
          fill: "#333",
        },
      }}
      onClick={onClick}
    >
      {open ? (
        <svg
          width="17"
          height="47"
          viewBox="0 0 19 47"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 10C0 4.47715 4.47715 0 10 0H19V47H10C4.47715 47 0 42.5228 0 37V10Z" />
          <path
            opacity="0.6"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.787 27.8074C11.9123 27.6847 11.9825 27.5191 11.9825 27.3466C11.9825 27.174 11.9123 27.0084 11.787 26.8857L8.38557 23.5884C8.37425 23.5779 8.36501 23.5653 8.35886 23.5513C8.35271 23.5373 8.34957 23.5222 8.34957 23.507C8.34957 23.4918 8.35271 23.4768 8.35886 23.4628C8.36501 23.4488 8.37425 23.4361 8.38557 23.4256L11.787 20.1283C11.8529 20.0685 11.9056 19.9966 11.9422 19.9166C11.9788 19.8367 11.9984 19.7504 11.9999 19.663C12.0014 19.5755 11.985 19.4887 11.9511 19.4076C11.9173 19.3265 11.8667 19.2528 11.8029 19.191C11.739 19.1291 11.6632 19.0804 11.5795 19.0476C11.4958 19.0148 11.4061 18.9986 11.3158 19.0001C11.2256 19.0015 11.1366 19.0206 11.0541 19.0561C10.9716 19.0915 10.8971 19.1427 10.8354 19.2066L7.43398 22.5039C7.29648 22.6351 7.18758 22.7915 7.11304 22.964C7.03851 23.1365 7 23.3216 7 23.5085C7 23.6955 7.03851 23.8806 7.11304 24.0531C7.18758 24.2256 7.29648 24.382 7.43398 24.5132L10.8354 27.8105C10.898 27.8708 10.9724 27.9187 11.0541 27.9512C11.1359 27.9837 11.2236 28.0003 11.312 28C11.4003 27.9997 11.4875 27.9826 11.569 27.9495C11.6505 27.9165 11.7247 27.8682 11.787 27.8074Z"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          width="17"
          height="47"
          viewBox="0 0 19 47"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 10C0 4.47715 4.47715 0 10 0H19V47H10C4.47715 47 0 42.5228 0 37V10Z" />
          <path
            opacity="0.6"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.21302 19.1926C7.08772 19.3153 7.01752 19.4809 7.01752 19.6534C7.01752 19.826 7.08772 19.9916 7.21302 20.1143L10.6144 23.4116C10.6257 23.4221 10.635 23.4347 10.6411 23.4487C10.6473 23.4627 10.6504 23.4778 10.6504 23.493C10.6504 23.5082 10.6473 23.5232 10.6411 23.5372C10.635 23.5512 10.6257 23.5639 10.6144 23.5744L7.21302 26.8717C7.14709 26.9315 7.0944 27.0034 7.05778 27.0834C7.02115 27.1633 7.0016 27.2496 7.00009 27.337C6.99859 27.4245 7.01502 27.5113 7.04887 27.5924C7.08273 27.6735 7.13331 27.7472 7.19715 27.809C7.26099 27.8709 7.33683 27.9196 7.42053 27.9524C7.50423 27.9852 7.5939 28.0014 7.68417 27.9999C7.77444 27.9985 7.86335 27.9794 7.94588 27.9439C8.0284 27.9085 8.10293 27.8573 8.16461 27.7934L11.566 24.4961C11.7035 24.3649 11.8124 24.2085 11.887 24.036C11.9615 23.8635 12 23.6784 12 23.4915C12 23.3045 11.9615 23.1194 11.887 22.9469C11.8124 22.7744 11.7035 22.618 11.566 22.4868L8.16461 19.1895C8.10196 19.1292 8.02762 19.0813 7.94588 19.0488C7.86414 19.0163 7.77641 18.9997 7.68804 19C7.59968 19.0003 7.5125 19.0174 7.43098 19.0505C7.34947 19.0835 7.27526 19.1318 7.21302 19.1926Z"
            fill="white"
          />
        </svg>
      )}
    </Box>
  );
};

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface IProps {
  open: boolean;
  setDrawerOpen?: (open: boolean) => void;
  currentPage?: string;
  onToggleDisplay: () => void;
  drawerExtraProps: DrawerProps;
}

const CMSCustomDrawer = ({
  open,
  setDrawerOpen,
  currentPage,
  onToggleDisplay,
  drawerExtraProps,
}: IProps) => {
  const { drawerMenuItemsState, setDrawerMenuItemsState } =
    useContext(CMSUICtx);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    navigate("/login");
  };

  return (
    <Drawer {...drawerExtraProps} open={open} onClose={onToggleDisplay}>
      <Stack sx={{ height: "100%" }}>
        <Stack
          spacing={1}
          px={2}
          pr={open ? 3 : undefined}
          sx={{ display: "flex", position: "relative" }}
        >
          <MinimizeMenuSVG onClick={onToggleDisplay} open={open} />
          <TypographyUserDetail>Frau. Müller</TypographyUserDetail>
          <TypographyUserDetail>müller@gmail.com</TypographyUserDetail>
        </Stack>

        <Stack spacing={2} direction={"column"} sx={{ flex: 9 }} pb={1}>
          <Stack spacing={1} px={2} mt={3}>
            {open && <Stack mb={1}></Stack>}
            <SingleLevel
              id="course"
              drawerOpen={open}
              item={{
                icon: (
                  <div style={{ display: "flex" }}>
                    <CustomProjectOverviewSVG
                      width={menuIconWidth - 3}
                      height={menuIconHeight - 3}
                    />
                  </div>
                ),
                title: "COURSES",
              }}
              currentPage={currentPage}
              onClick={() => {
                navigate("/");
              }}
              location={location}
              endPoint={"/"}
            />

            <SingleLevel
              id="coach-profile"
              drawerOpen={open}
              item={{
                icon: (
                  <div style={{ display: "flex" }}>
                    <CustomProvileSVG
                      width={menuIconWidth - 3}
                      height={menuIconHeight - 3}
                    />
                  </div>
                ),
                title: "COACH PROFILE",
              }}
              currentPage={currentPage}
              onClick={() => {
                navigate("/coach-profile");
              }}
              endPoint={"/coach-profile"}
              location={location}
            />

            <SingleLevel
              id="coach-allocation"
              drawerOpen={open}
              item={{
                icon: (
                  <div style={{ display: "flex" }}>
                    <CustomSupportSVG
                      width={menuIconWidth - 3}
                      height={menuIconHeight - 3}
                    />
                  </div>
                ),
                title: "COACH ALLOCATION",
              }}
              currentPage={currentPage}
              onClick={() => {
                navigate("/coach-allocation");
              }}
              endPoint={"/coach-allocation"}
              location={location}
            />

            <SingleLevel
              id="course-allocation"
              drawerOpen={open}
              item={{
                icon: (
                  <div style={{ display: "flex" }}>
                    <CustomWorkPackageSVG
                      width={menuIconWidth - 3}
                      height={menuIconHeight - 3}
                    />
                  </div>
                ),
                title: "COURSE ALLOCATION",
              }}
              currentPage={currentPage}
              onClick={() => {
                navigate("/course-allocation");
              }}
              endPoint={"/course-allocation"}
              location={location}
            />

            <SingleLevel
              id="logout"
              drawerOpen={open}
              item={{
                icon: (
                  <div style={{ display: "flex" }}>
                    <CustomSignOutSVG
                      width={menuIconWidth - 3}
                      height={menuIconHeight - 3}
                    />
                  </div>
                ),
                title: "LOGOUT",
              }}
              currentPage={currentPage}
              onClick={handleSignOut}
              endPoint={"/login"}
              location={location}
            />
          </Stack>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default CMSCustomDrawer;
