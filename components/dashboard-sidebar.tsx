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
import Image from "next/image";



export default function DashboardSidebar() {
const pathname = usePathname();
const navigation = [
  {
    label: "Dashboard",
    href: "/",
    icon: <DashboardIcon />,
  },
  // if current page is rc/[rcid ] then only show below
  
 ...(pathname.match(/^\/rc\/[^/]+$/)
    ? [
        {
          label: "Master Magic Sheet",
          href: `${pathname}/magicsheet`,
          icon: <DashboardIcon />,
        },
      ]
    : []),
  {
    label: "RAS Portal",
    href: "https://placement.iitk.ac.in",
    icon: <LaunchIcon />,
    external: true,
  },
];
// primary.dark
const account = [

  {
    label: "Credits",
    href: "/credits",
    icon: <StarsIcon />,
  },
];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  };

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        bgcolor: "primary.dark",
      }}
    >
      <Box sx={{ height: "4vh" }} />

          <Image
            src="/dashboard_logo.png"
            alt="logo"
            width={245}
            height={60}
          />
       
      {/* Profile Card */}
      <Box sx={{
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
              sx={{
                color: "white",
                borderRadius: 2,
                mb: 0.5,
              }}
            >
              <ListItemIcon sx={{
                color: "white",
                minWidth: 40,
              }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ) : (
            <ListItemButton
              key={item.label}
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              sx={{
                color: "white",
                borderRadius: 2,
                mb: 0.5,
              }}
            >
              <ListItemIcon sx={{
                color: "white",
                minWidth: 40,
              }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          )
        )}
      </List>

      <Divider />

      {/* Push Bottom */}
      <Box sx={{
        display: "flex",


      }} />

      {/* Account Section */}
      <List sx={{ px: 1 }}>
        {account.map((item) => (
          <ListItemButton
            key={item.label}
            component={Link}
            href={item.href}
            selected={pathname === item.href}
            sx={{
              color: "white",
              borderRadius: 2,
              mb: 0.5,
            }}
          >
            <ListItemIcon sx={{
              color: "white",
              minWidth: 40,
            }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}

        <ListItemButton
          onClick={handleLogout}
          sx={{
            color: "white",
            borderRadius: 2,
            mb: 0.5,
          }}
        >
          <ListItemIcon sx={{
            color: "white",
            minWidth: 40,
          }}>
            <LogoutIcon  sx={{
    color: "white",
    minWidth: 40,
  }}/>
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
}