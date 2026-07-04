"use client";

import { Chip, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import InputAdornment from "@mui/material/InputAdornment";
import { useRouter } from "next/navigation";


export default function RCPage() {
  const router = useRouter();
  const rows = [
  {
    id: 16,
    name: "Placement Phase 2",
    academic_year: "2025-26",
    type: "Placement",
    phase: "Phase 2",
    start_date: "02/01/2026",
    is_active: true,
  },
  {
    id: 17,
    name: "Intern Phase 1",
    academic_year: "2026-27",
    type: "Intern",
    phase: "Phase 1",
    start_date: "29/05/2026",
    is_active: true,
  },
  {
    id: 1,
    name: "Intern Phase 1",
    academic_year: "2022-23",
    type: "Intern",
    phase: "Phase 1",
    start_date: "20/07/2022",
    is_active: false,
  },
  {
    id: 2,
    name: "Placement Phase 1",
    academic_year: "2022-23",
    type: "Placement",
    phase: "Phase 1",
    start_date: "16/07/2022",
    is_active: false,
  },
];

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "name",
    headerName: "Recruitment Drive",
    flex: 1,
    minWidth: 220,
  },
  {
    field: "academic_year",
    headerName: "Session",
    width: 140,
  },
  {
    field: "type",
    headerName: "Type",
    width: 160,
  },
  {
    field: "phase",
    headerName: "Phase",
    width: 160,
  },
  {
    field: "start_date",
    headerName: "Start Date",
    width: 150,
  },
  {
    field: "is_active",
    headerName: "Status",
    width: 160,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Chip
        label={params.value ? "ACTIVE" : "INACTIVE"}
        color={params.value ? "success" : "error"}
        onClick={() => {router.push(`/coco/rc/${params.row.id}`)}}
        size="small"
      />
    ),
  },
];

  return (

    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
     
      
      </div>

           <h2 className="text-2xl font-bold">Recruitment Cycles</h2>
      <Paper className="p-4">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
     <TextField
  size="small"
  placeholder="Search recruitment cycle..."
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

        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
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
          }}
        />
      </Paper>
    </div>
  );
}