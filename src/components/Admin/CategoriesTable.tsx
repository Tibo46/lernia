import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import { useCategories } from "../../hooks/useCategories";
import { CategoryModel } from "../../models/CategoriesModels";
import UpdateCategoryDialog from "./UpdateCategoryDialog";
import CreateCategoryDialog from "./CreateCategoryDialog";
import { useState } from "react";

const CategoriesTable = () => {
  const { categories, refetch } = useCategories();
  const [isCreatingCategoryOpen, setIsCreatingCategoryOpen] = useState(false);

  const columns: GridColDef<CategoryModel>[] = [
    // { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      width: 170,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "color",
      headerName: "Color",
      renderCell: (value) => {
        return (
          <Box sx={{ bgcolor: value.row.color, textAlign: "center" }}>
            {value.row.color}
          </Box>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <UpdateCategoryDialog
            handleClose={() => {
              refetch();
            }}
            category={categories!.find((c) => c.id === id)!}
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: "90vh" }}>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button
            variant="contained"
            onClick={() => {
              setIsCreatingCategoryOpen(true);
            }}
          >
            Create Category
          </Button>
        </Stack>
        <DataGrid
          rows={categories}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 50,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection={false}
          disableRowSelectionOnClick={true}
        />
      </Stack>
      <CreateCategoryDialog
        isOpen={isCreatingCategoryOpen}
        handleClose={() => {
          setIsCreatingCategoryOpen(false);
          refetch();
        }}
      />
    </Box>
  );
};

export default CategoriesTable;
