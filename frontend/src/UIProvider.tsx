import React, { createContext, useCallback, useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";

type WindowSize = {
  width: number;
  height: number;
};

export type CMSDrawerMenuItemsState = {
  profileMenu: boolean;
  workPackagesMenu: boolean;
};
interface CMSUiProps {
  windowSize: WindowSize;
  isMobile: boolean;
  overflowEnabled: boolean;
  setOverflowEnabled: (value: boolean) => void;
  colorTemplate: CMSColorTemplate;
  setColorTemplate: (value: CMSColorTemplate) => void;
  disableEditing: boolean;
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
  drawerMenuItemsState: CMSDrawerMenuItemsState;
  setDrawerMenuItemsState: ({
    key,
    isOpen,
  }: {
    key: keyof CMSDrawerMenuItemsState;
    isOpen: boolean;
  }) => void;
}

export interface CMSColorTemplate {
  mainColor: string;
  mainColorHover?: string;
  secondaryColor: string;
  secondaryColorHover?: string;
  thirdColor: string;
}

export const defaultColorTemplate: CMSColorTemplate = {
  mainColor: "#00205B",
  mainColorHover: "#466091",
  secondaryColor: "#FFFFFF",
  thirdColor: "#000000",
};

export const CMSUICtx = createContext({} as CMSUiProps);

type Props = {
  children?: React.ReactNode;
};

export const CMSUIProvider: React.FC<Props> = ({ children }) => {
  // Create a firebase reference

  const { height, width } = useWindowSize();
  const [overflowEnabled, setOverflowEnabled] = useState<boolean>(true);
  const [isMobile, setMobile] = useState(false);
  const [disableEditing, setDisableEditing] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [drawerMenuItemsState, setDrawerMenuItemsState] =
    useState<CMSDrawerMenuItemsState>({
      profileMenu: false,
      workPackagesMenu: true,
    });
  const [colorTemplate, setColorTemplate] =
    useState<CMSColorTemplate>(defaultColorTemplate);

  const saveDrawerMenuItemState = ({
    key,
    isOpen,
  }: {
    key: string;
    isOpen: boolean;
  }) => {
    setDrawerMenuItemsState({
      ...drawerMenuItemsState,
      [key]: isOpen,
    });
  };

  useEffect(() => {
    if (width < 1024) {
      setDisableEditing(true);
      setMobile(true);
    } else {
      setMobile(false);
      setDisableEditing(false);
    }
  }, [width]);

  return (
    <CMSUICtx.Provider
      value={{
        windowSize: { height, width },
        isMobile,
        overflowEnabled: overflowEnabled,
        setOverflowEnabled: setOverflowEnabled,
        colorTemplate: colorTemplate,
        setColorTemplate: setColorTemplate,
        disableEditing: disableEditing,
        drawerOpen: drawerOpen,
        setDrawerOpen: setDrawerOpen,
        drawerMenuItemsState,
        setDrawerMenuItemsState: saveDrawerMenuItemState,
      }}
    >
      {children}
    </CMSUICtx.Provider>
  );
};
