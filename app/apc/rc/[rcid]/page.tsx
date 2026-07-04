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
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

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
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      ),
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
              `/apc/rc/${params.id}/magicsheet/${params.row.id}`
            )
          }
        >
          View Magicsheet
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
              <h1 className="text-4xl font-bold">
            Intern 2026-27 Phase 1
          </h1>

        </div>
<h2 className="text-2xl font-bold">Proforma</h2>
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            p: 2,
          }}
        >
          <div className="mb-4 flex items-center justify-between">
            <TextField
              size="small"
              placeholder="Search company..."
              sx={{ width: 320 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <IconButton color="primary" onClick={() => setAddOpen(true)}>
              <AddIcon />
            </IconButton>
          </div>

          <Box sx={{ width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
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

                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f8fafc",
                  fontWeight: 600,
                },

                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#f8fafc",
                },

                "& .MuiDataGrid-cell": {
                  borderColor: "#f1f5f9",
                },
              }}
            />
          </Box>
        </Paper>
      </div>

      <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Magic Sheet</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "16px !important" }}>
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
          <Button onClick={() => { setAddOpen(false); setCompanyName(""); setRole(""); }}>Cancel</Button>
          <Button variant="contained" onClick={() => { setAddOpen(false); setCompanyName(""); setRole(""); }}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}