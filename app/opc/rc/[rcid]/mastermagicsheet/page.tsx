"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";

type MagicSheetRow = {
  id: number;
  rollNo: string;
  name: string;
  coco: string;
  program: string;
  cpi: number;
  status: string;
  r1In: string;
  r1Out: string;
  comments: string;
};

export default function MagicSheetPage() {
  const params = useParams<{ rcid?: string }>();
  const [rows, setRows] = useState<MagicSheetRow[]>([]);
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const url = params?.rcid
      ? `${apiBaseUrl}/api/opc/rc/${params.rcid}/mastermagicsheet`
      : `${apiBaseUrl}/api/opc/mastermagicsheet`;

    fetch(url, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((payload) => {
        const data = Array.isArray(payload?.data) ? payload.data : [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedRows = data.map((row: any, index: number) => ({
          id: row.id ?? index + 1,
          rollNo: row.roll_number ?? "",
          name: row.name ?? "",
          coco: row.coco ?? "",
          program: row.program ?? "",
          cpi: row.cpi ?? 0,
          status: row.status ?? "Pending",
          r1In: row.r1_in_time ? new Date(row.r1_in_time).toLocaleString() : "",
          r1Out: row.r1_out_time ? new Date(row.r1_out_time).toLocaleString() : "",
          comments: row.comments ?? "",
        }));

        setRows(mappedRows);
      })
      .catch(() => setRows([]));
  }, [params?.rcid]);

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
            Master Magic Sheet
          </h1>
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
         

            <div className="mb-4 flex justify-between">
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
              <IconButton color="primary" onClick={() => setAddModalOpen(true)}>
                <AddIcon />
              </IconButton>
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

      {/* Add New Magic Sheet Modal */}
      <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)} maxWidth="sm" fullWidth>
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
          <Button onClick={() => { setAddModalOpen(false); setCompanyName(""); setRole(""); }}>Cancel</Button>
          <Button variant="contained" onClick={() => { setAddModalOpen(false); setCompanyName(""); setRole(""); }}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
