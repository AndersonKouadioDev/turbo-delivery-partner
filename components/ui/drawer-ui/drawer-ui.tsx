"use client";

import { CSSProperties, Dispatch, SetStateAction, useState } from "react";
import { Drawer } from "vaul";
import "./drawer.style.css";
import { useTheme } from "next-themes";

interface I_Drawer {
  children?: React.ReactNode;
  snapPoints?: (string | number | null)[];
  type?: "withScale" | "withoutScale";
  title?: string | React.ReactNode;
  trigger?: React.ReactNode;
  style?: CSSProperties | undefined;
  direction?: string;
  dismissible?: boolean;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

interface I_DrawerParams {
  root: any;
  overlay: CSSProperties | undefined;
  contaner: CSSProperties | undefined;
  content: CSSProperties | undefined;
  hand_bar: CSSProperties | undefined;
  title: CSSProperties | undefined;
}

export default function DrawerUI({
  children,
  snapPoints,
  type = "withScale",
  title,
  trigger = <button>Open Drawer</button>,
  open,
  setOpen,
  style,
  direction = "bottom",
  dismissible,
}: I_Drawer) {
  const { theme } = useTheme();

  const [snap, setSnap] = useState<number | string | null>(
    snapPoints ? snapPoints[0] : null,
  );
  const [cursor, setCursor] = useState<string>("grab");

  const drawerParams: I_DrawerParams = {
    root: {
      open,
      direction,
      dismissible,
      shouldScaleBackground: true,
    },
    overlay: {
      zIndex: 100,
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    contaner: {
      zIndex: 100,
      backgroundColor: theme == "dark" ? "#212121" : "#FFF",
      display: "flex",
      flexDirection: "column",
      borderRadius: "10px",
      height: "96%",
      marginTop: "24px",
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      overflow: "auto",
      boxShadow: `0px -10px 1000px rgba(0, 0, 0, 0.4)`,
    },
    content: {
      padding: "3rem 1rem",
      backgroundColor: theme == "dark" ? "#212121" : "#FFF",
      borderRadius: "10px 10px 0 0",
      flex: 1,
    },
    hand_bar: {
      margin: "auto",
      width: "48px",
      height: "4px",
      flexShrink: 0,
      borderRadius: "9999px",
      backgroundColor: "#CBD5DC",
      marginBottom: "2rem",
      cursor,
    },
    title: {
      margin: "auto",
    },
  };

  const withScale: I_DrawerParams = {
    root: {
      ...drawerParams.root,
      ...(snapPoints
        ? {
            snapPoints: [snap, "300px", "450px", 1],
            activeSnapPoint: snap,
            setActiveSnapPoint: setSnap,
          }
        : {}),
    },
    overlay: {
      ...drawerParams.overlay,
    },
    contaner: {
      ...drawerParams.contaner,
    },
    content: {
      ...drawerParams.content,
    },
    hand_bar: {
      ...drawerParams.hand_bar,
    },
    title: {
      ...drawerParams.title,
    },
  };

  const withoutScale: I_DrawerParams = {
    root: {
      ...drawerParams.root,
      shouldScaleBackground: false,
    },
    overlay: {
      ...drawerParams.overlay,
    },
    contaner: {
      ...drawerParams.contaner,
      height: undefined,
    },
    content: {
      ...drawerParams.content,
    },
    hand_bar: {
      ...drawerParams.hand_bar,
    },
    title: {
      ...drawerParams.title,
    },
  };

  const myParams: I_DrawerParams =
    type == "withScale" ? withScale : withoutScale;

  return (
    <Drawer.NestedRoot {...myParams.root}>
      <Drawer.Trigger
        asChild
        onClick={() => {
          setOpen && setOpen(true);
        }}
      >
        {trigger}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay style={{ ...myParams.overlay }} />
        <Drawer.Content style={{ ...myParams.contaner, ...style }}>
          <div style={{ ...myParams.content }}>
            <button
              style={{ padding: "10px 0px", cursor }}
              onMouseDown={(e) => {
                e.preventDefault();
                setCursor("grabbing");
              }}
              onMouseUp={(e) => {
                e.preventDefault();
                setCursor("grab");
              }}
            >
              <div style={{ ...myParams.hand_bar }} />
            </button>
            <div style={{ ...myParams.title }}>
              <Drawer.Title>{title}</Drawer.Title>
            </div>
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.NestedRoot>
  );
}
