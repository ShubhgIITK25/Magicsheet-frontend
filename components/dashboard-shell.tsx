"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Drawer, IconButton } from "@mui/material";

import DashboardSidebar from "./dashboard-sidebar";

const DRAWER_WIDTH = 280;

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isAuth = pathname.startsWith("/auth");

  if (isAuth) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? DRAWER_WIDTH : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            transition: "transform 0.2s ease",
            transform: open ? "translateX(0)" : `translateX(-${DRAWER_WIDTH}px)`,
            overflowX: "hidden",
          },
        }}
      >
        <DashboardSidebar />
      </Drawer>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <IconButton
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            position: "fixed",
            top: 19,
            left: open ? DRAWER_WIDTH + 8 : 0,
            color: "white",
            zIndex: 1300,
            transition: "left 0.2s ease",
          }}
        >
          <MenuIcon />
        </IconButton>
        {children}
      </Box>
    </Box>
  );
}
