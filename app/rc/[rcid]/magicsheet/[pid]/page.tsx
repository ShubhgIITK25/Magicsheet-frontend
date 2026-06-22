"use client";

import { useState } from "react";
import {
  Box,
  Chip,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";


const rows = [
  {
    id: 1,
    rollNo: "240001",
    name: "Muragesh",
    coco: "Muragesh",
    program: "NA",
    cpi: 0,
    status: "Pending",
    r1In: "",
    r1Out: "",
    comments: "",
  },
  {
    id: 2,
    rollNo: "210461",
    name: "Sneha Verma",
    coco: "Muragesh",
    program: "BT-AE",
    cpi: 9.1,
    status: "Submitted",
    r1In: "2025-07-21 17:55",
    r1Out: "2025-07-21 18:22",
    comments: "",
  },
  {
    id: 3,
    rollNo: "210463",
    name: "Meera Nair",
    coco: "Muragesh",
    program: "BT-MSE",
    cpi: 8.4,
    status: "Submitted",
    r1In: "2025-07-21 17:55",
    r1Out: "2025-07-21 18:22",
    comments: "",
  },
];

export default function MagicSheetPage() {
  const [search, setSearch] = useState("");

  const filteredRows = rows.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns: GridColDef[] = [
    {
      field: "rollNo",
      headerName: "Roll No.",
      width: 120,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "coco",
      headerName: "CoCo",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "program",
      headerName: "Primary Program",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "cpi",
      headerName: "CPI",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value}
          color={
            params.value === "Submitted"
              ? "success"
              : "warning"
          }
        />
      ),
    },
    {
      field: "r1In",
      headerName: "R1 In Time",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "r1Out",
      headerName: "R1 Out Time",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "comments",
      headerName: "Comments",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <IconButton size="small">
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Internship 2024-25 P1
          </h1>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold">
            Magic Sheet
          </h2>
        </div>

        <Paper
          elevation={0}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
         

          <div className="p-6">
            <h3 className="mb-6 text-2xl font-semibold">
            company name
            </h3>

            <div className="mb-4 flex justify-end">
              <TextField
                size="small"
                placeholder="Search..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                sx={{ width: 280 }}
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
            </div>

            <Box sx={{ width: "100%" }}>
              <DataGrid
                rows={filteredRows}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                      page: 0,
                    },
                  },
                }}
                sx={{
                  border: 0,

                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f8fafc",
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
          </div>
        </Paper>
      </div>
    </div>
  );
}