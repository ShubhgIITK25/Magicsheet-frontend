"use client";

import { ReactNode, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  IconButton,
  Box,
} from "@mui/material";

import DashboardSidebar from "./dashboard-sidebar";

export default function DashboardShell({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1300,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DashboardSidebar />
      </Drawer>
  <Box
   sx={{ height: "13vh" }} />
      {children}
    </>
  );
}