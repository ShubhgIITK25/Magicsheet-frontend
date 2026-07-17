"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const INK = "#455A64";
const BRASS = "#A67C3D";
const BRASS_DARK = "#6B4E23";
const BRICK = "#A8433F";
const BRICK_DARK = "#6B2A27";
const PAGE_BG = "#EEF0F3";
const HAIRLINE = "#D6DAE1";
const Green = "#2E7D32";

type Proforma = {
  id: number;
  company_name: string;
  updated_at: string;
  status: "Pending" | "Approved" | "Rejected";
  deadline: string;
  hide_details: boolean;
  active_hr: string;
  role: string;
  profile: string;
};

export default function RCDetailsPage() {
  const router = useRouter();
  const [addOpen, setAddOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");

  const rows: Proforma[] = [
    {
      id: 1,
      company_name: "McKinsey & Company",
      updated_at: "22/06/2026, 7:39 PM",
      status: "Pending",
      deadline: "Date not Set",
      hide_details: true,
      active_hr: "Vishakha Vij",
      role: "Finance & Consulting",
      profile: "Business Analyst Intern",
    },
    {
      id: 2,
      company_name: "Plivo",
      updated_at: "22/06/2026, 1:23 PM",
      status: "Pending",
      deadline: "Date not Set",
      hide_details: true,
      active_hr: "Divyarajsinh Matieda",
      role: "IT / Software",
      profile: "Software Development",
    },
    {
      id: 3,
      company_name: "Plivo",
      updated_at: "22/06/2026, 1:22 PM",
      status: "Pending",
      deadline: "Date not Set",
      hide_details: true,
      active_hr: "Divyarajsinh Matieda",
      role: "IT / Software",
      profile: "AI/ML Engineer Intern",
    },
    {
      id: 4,
      company_name: "Ebay",
      updated_at: "21/06/2026, 8:25 PM",
      status: "Pending",
      deadline: "Date not Set",
      hide_details: true,
      active_hr: "Deepika Rampuria",
      role: "Core Engineering & Tech",
      profile: "Software Engineer Intern",
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "company_name",
      headerName: "Company Name",
      minWidth: 220,
      flex: 1,
    },
    {
      field: "updated_at",
      headerName: "Last Updated",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={
            params.value === "Approved"
              ? "success"
              : params.value === "Rejected"
              ? "error"
              : "warning"
          }
        />
      ),
    },
    {
      field: "deadline",
      headerName: "Application Deadline",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "hide_details",
      headerName: "Details Hidden",
      width: 140,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value ? "Yes" : "No"}
          color={params.value ? "default" : "primary"}
        />
      ),
    },
    {
      field: "active_hr",
      headerName: "Active HR",
      minWidth: 220,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role Name",
      minWidth: 220,
      flex: 1,
    },
    {
      field: "profile",
      headerName: "Profile",
      minWidth: 220,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() =>
            router.push(
              `/opc/rc/${params.id}/magicsheet/${params.row.id}`
            )
          }
        >
          View Magicsheet
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ backgroundColor: PAGE_BG, minHeight: "100%" }}>
      {/* Sticky letterhead */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backgroundColor: INK,
          px: { xs: 3, md: 5 },
          py: 3,
          borderBottom: `3px solid ${BRASS}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Typography
            sx={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: { xs: 26, md: 32 },
              fontWeight: 600,
              color: "#fff",
              letterSpacing: 0.3,
              lineHeight: 1.2,
            }}
          >
            Proforma
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            color: BRASS,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Manage and view all proformas
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 3, md: 5 } }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "baseline",
            gap: 1.5,
            borderBottom: `1px solid ${HAIRLINE}`,
            pb: 1.5,
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 22,
              fontWeight: 600,
              color: INK,
            }}
          >
            Companies
          </Typography>
          <Typography
            sx={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              color: "text.secondary",
            }}
          >
            {rows.length} entries on record
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: "6px",
            border: `1px solid ${HAIRLINE}`,
            backgroundColor: "#fff",
          }}
        >
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <TextField
              size="small"
              placeholder="Search company..."
              sx={{
                width: { xs: "100%", md: 320 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 13,
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: BRASS }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <IconButton color="primary" onClick={() => setAddOpen(true)}>
              <AddIcon />
            </IconButton>
          </div>

          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            rowHeight={64}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                  page: 0,
                },
              },
            }}
            sx={{
              border: 0,
              fontFamily: "'IBM Plex Sans', sans-serif",
              "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-cell": {
                display: "flex",
                alignItems: "center",
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: `2px solid ${INK}`,
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: INK,
              },
              "& .MuiDataGrid-cell": {
                borderColor: HAIRLINE,
                overflow: "visible",
              },
              "& .MuiDataGrid-cell:focus": { outline: "none" },
              "& .MuiDataGrid-cell:focus-within": { outline: "none" },
              "& .MuiDataGrid-row": {
                overflow: "visible",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#FAF8F3",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: `1px solid ${HAIRLINE}`,
                fontFamily: "'IBM Plex Mono', monospace",
              },
            }}
          />
        </Paper>
      </Box>

      <Dialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Proforma</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: "16px !important",
          }}
        >
          <TextField
            label="Company Name"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAddOpen(false);
              setCompanyName("");
              setRole("");
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setAddOpen(false);
              setCompanyName("");
              setRole("");
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}