import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserModel } from "../../models/UsersModels";
import { Typography } from "@mui/material";

const UsersTable = () => {
  const { users } = useAllUsers();

  const columns: GridColDef<UserModel>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 120,
    },
    {
      field: "numberOfExercisesFinished",
      headerName: "No. Exercises Finished",
      width: 155,
    },
    {
      field: "lastLoginAt",
      headerName: "Last Activity",
      width: 130,
      valueGetter: (value, _) =>
        Intl.DateTimeFormat("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(value)),
    },
    {
      field: "createdAt",
      headerName: "Joined",
      width: 130,
      valueGetter: (value, _) =>
        Intl.DateTimeFormat("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(value)),
    },
  ];

  return (
    <Box sx={{ maxHeight: 400 }}>
      <Typography variant="h2" sx={{ fontSize: "1rem", mb: 2 }}>
        Users
      </Typography>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        sx={{ background: "#fff" }}
      />
    </Box>
  );
};

export default UsersTable;
