import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAllQuestions } from "../../hooks/useAllQuestions";
import { QuestionModel } from "../../models/ExercisesModels";

const QuestionsTable = () => {
  const { questions } = useAllQuestions();

  const columns: GridColDef<QuestionModel>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "questionText",
      headerName: "Question",
      width: 350,
    },
    {
      field: "helperText",
      headerName: "Helper",
      width: 200,
    },
    {
      field: "correctAnswer",
      headerName: "Answer",
    },
    {
      field: "word",
      headerName: "Word",
    },
    {
      field: "numberOfFlaggedIncorrect",
      headerName: "No. Flagged Incorrect",
      width: 155,
    },
  ];

  return (
    <Box sx={{ height: "90vh" }}>
      <DataGrid
        rows={questions}
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
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default QuestionsTable;
