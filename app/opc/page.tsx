"use client";

import { Chip, Paper, TextField, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import InputAdornment from "@mui/material/InputAdornment";
import { useRouter } from "next/navigation";

const INK = "#455A64";
const BRASS = "#A67C3D";
const BRASS_DARK = "#6B4E23";
const BRICK = "#A8433F";
const BRICK_DARK = "#6B2A27";
const PAGE_BG = "#EEF0F3";
const HAIRLINE = "#D6DAE1";
const Green = "#2E7D32";

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
      headerName: "Reg. No.",
      width: 100,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontFamily: "'IBM Plex Mono', monospace", color: "text.secondary" }}
        >
          {String(params.value).padStart(4, "0")}
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Recruitment Drive",
      flex: 1,
      minWidth: 220,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: INK, fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "academic_year",
      headerName: "Session",
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 0.5,
            textTransform: "uppercase",
            color: "text.secondary",
            borderLeft: `2px solid ${HAIRLINE}`,
            pl: 1,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "phase",
      headerName: "Phase",
      width: 130,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 140,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontFamily: "'IBM Plex Mono', monospace", color: "text.secondary" }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 160,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const active = params.value as boolean;
        const color = active ? BRASS_DARK : BRICK_DARK;
        const border = active ? Green : BRICK;
        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="button"
              onClick={() => router.push(`/opc/rc/${params.row.id}`)}
              sx={{
                cursor: "pointer",
                background: "none",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color,
                border: `1.5px solid ${border}`,
                borderRadius: "3px",
                padding: "4px 10px",
                lineHeight: 1.4,
                transform: "rotate(-1.5deg)",
                transition: "opacity 0.15s ease",
                "&:hover": { opacity: 0.7 },
              }}
            >
              {active ? "ACTIVE" : "CLOSED"}
            </Box>
          </Box>
        );
      },
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
          Magicsheet
        </Typography>
        <Typography
          sx={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            color: BRASS,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            mt: 0.5,
            mb: 1.5,
          }}
        >
          Students Placement Office, IIT Kanpur
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
            Recruitment Cycles
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
              placeholder="Search recruitment cycle..."
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
    </Box>
  );
}