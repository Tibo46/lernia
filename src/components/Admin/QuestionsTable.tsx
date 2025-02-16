import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAllQuestions } from "../../hooks/useAllQuestions";
import { QuestionModel } from "../../models/ExercisesModels";
import UpdateQuestionDialog from "./UpdateQuestionDialog";
import GenerateQuestionsDialog from "./GenerateQuestionsDialog";
import { useState } from "react";
import DeleteQuestionDialog from "./DeleteQuestionDialog";
import { Button, Stack } from "@mui/material";
import { useCategories } from "../../hooks/useCategories";

const QuestionsTable = () => {
  const { questions, refetch } = useAllQuestions();
  const { categories } = useCategories();
  const [isGeneratingQuestionsOpen, setIsGeneratingQuestionsOpen] =
    useState(false);

  const columns: GridColDef<QuestionModel>[] = [
    // { field: "id", headerName: "ID" },
    {
      field: "questionText",
      headerName: "Question",
      flex: 1,
    },
    {
      field: "categoryId",
      headerName: "Category",
      width: 120,
      valueGetter: (value) => {
        const category = categories?.find((c) => c.id === value);
        return category?.name;
      },
    },
    {
      field: "correctAnswer",
      headerName: "Answer",
      width: 170,
    },
    {
      field: "word",
      headerName: "Word",
      width: 120,
    },
    {
      field: "numberOfFlaggedIncorrect",
      headerName: "No. Flagged Incorrect",
      width: 150,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <UpdateQuestionDialog
            key="update"
            handleClose={() => {
              refetch();
            }}
            question={questions!.find((q) => q.id === id)!}
          />,
          <DeleteQuestionDialog
            key="delete"
            handleClose={() => {
              refetch();
            }}
            question={questions!.find((q) => q.id === id)!}
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
            onClick={() => setIsGeneratingQuestionsOpen(true)}
          >
            Generate Questions
          </Button>
        </Stack>
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
          disableRowSelectionOnClick={true}
        />
      </Stack>

      <GenerateQuestionsDialog
        isOpen={isGeneratingQuestionsOpen}
        handleClose={() => {
          setIsGeneratingQuestionsOpen(false);
          refetch();
        }}
      />
    </Box>
  );
};

export default QuestionsTable;
