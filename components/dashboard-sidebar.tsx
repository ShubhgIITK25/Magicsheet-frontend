"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LaunchIcon from "@mui/icons-material/Launch";
import StarsIcon from "@mui/icons-material/Stars";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";

const navigation = [
  {
    label: "Dashboard",
    href: "/",
    icon: <DashboardIcon />,
  },
  {
    label: "RAS Portal",
    href: "https://placement.iitk.ac.in",
    icon: <LaunchIcon />,
    external: true,
  },
];

const account = [
 
  {
    label: "Credits",
    href: "/credits",
    icon: <StarsIcon />,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
        <Box sx={{ height: "13vh" }} />
      {/* Profile Card */}
      <Box   sx={{
    p: 3,
  }}>
    
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
            
            
          <Avatar sx={{ width: 48, height: 48 }}>
            M
          </Avatar>

          <Box>
         <Typography
  variant="body2"
  color="text.secondary"
  sx={{ mt: 1 }}
>
  Muragesh
</Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Administrator
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Main Navigation */}
      <List sx={{ px: 1, py: 2 }}>
        {navigation.map((item) =>
          item.external ? (
            <ListItemButton
              key={item.label}
              component="a"
              href={item.href}
              target="_blank"
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ) : (
            <ListItemButton
              key={item.label}
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              sx={{
                borderRadius: 2,
                mb: 0.5,
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          )
        )}
      </List>

      <Divider />

      {/* Push Bottom */}
      <Box   sx={{
    display: "flex",

   
  }}/>

      {/* Account Section */}
      <List sx={{ px: 1 }}>
        {account.map((item) => (
          <ListItemButton
            key={item.label}
            component={Link}
            href={item.href}
            selected={pathname === item.href}
            sx={{
              borderRadius: 2,
              mb: 0.5,
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            mb: 2,
            color: "error.main",
          }}
        >
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
}