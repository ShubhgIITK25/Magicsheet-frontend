"use client";

import { useState } from "react";
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
    r1In: "2025-07-21T17:55",
    r1Out: "2025-07-21T18:22",
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
    r1In: "2025-07-21T17:55",
    r1Out: "2025-07-21T18:22",
    comments: "",
  },
];

type RowType = (typeof rows)[0];

export default function MagicSheetPage() {
  const [search, setSearch] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editR1In, setEditR1In] = useState("");
  const [editR1Out, setEditR1Out] = useState("");
  const [editComments, setEditComments] = useState("");
  const [rollModalOpen, setRollModalOpen] = useState(false);
  const [rollNumber, setRollNumber] = useState("");
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailId, setEmailId] = useState("");

  const handleEditOpen = (row: RowType) => {
    setEditR1In(row.r1In);
    setEditR1Out(row.r1Out);
    setEditComments(row.comments);
    setEditOpen(true);
  };

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
      renderCell: (params) => (
        <IconButton size="small" onClick={() => handleEditOpen(params.row as RowType)}>
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
         <h1 className="text-3xl font-semibold">
            Company Magic Sheet
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
              <div>
            <IconButton color="primary" onClick={() => setRollModalOpen(true)}>
            <AddIcon />
          </IconButton>
            <IconButton color="primary" onClick={() => setEmailModalOpen(true)}>
            <AddIcon />
          </IconButton>
          </div>
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

      {/* Edit Student Record Modal */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Student Record</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "16px !important" }}>
          <TextField
            label="R1 In Time"
            type="datetime-local"
            value={editR1In}
            onChange={(e) => setEditR1In(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
          <TextField
            label="R1 Out Time"
            type="datetime-local"
            value={editR1Out}
            onChange={(e) => setEditR1Out(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
          <TextField
            label="Comments"
            multiline
            rows={3}
            value={editComments}
            onChange={(e) => setEditComments(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setEditOpen(false)}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add Student by Roll Number Modal */}
      <Dialog open={rollModalOpen} onClose={() => setRollModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Student by Roll Number</DialogTitle>
        <DialogContent sx={{ pt: "16px !important" }}>
          <TextField
            label="Roll Number"
            required
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setRollModalOpen(false); setRollNumber(""); }}>Cancel</Button>
          <Button variant="contained" onClick={() => { setRollModalOpen(false); setRollNumber(""); }}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Add Student by Email Modal */}
      <Dialog open={emailModalOpen} onClose={() => setEmailModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Student by Email</DialogTitle>
        <DialogContent sx={{ pt: "16px !important" }}>
          <TextField
            label="Email ID"
            type="email"
            required
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setEmailModalOpen(false); setEmailId(""); }}>Cancel</Button>
          <Button variant="contained" onClick={() => { setEmailModalOpen(false); setEmailId(""); }}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
