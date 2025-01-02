import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAllQuestions } from "../../hooks/useAllQuestions";
import { QuestionModel } from "../../models/ExercisesModels";
import UpdateQuestionDialog from "./UpdateQuestionDialog";
import GenerateQuestionsDialog from "./GenerateQuestionsDialog";
import { useState } from "react";

const QuestionsTable = () => {
  const { questions } = useAllQuestions();
  const [isGeneratingQuestionsOpen, setIsGeneratingQuestionsOpen] =
    useState(false);
  const [isUpdatingQuestionOpen, setIsUpdatingQuestionOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionModel | null>(null);

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
      {selectedQuestion && (
        <UpdateQuestionDialog
          isOpen={isUpdatingQuestionOpen}
          handleClose={() => setIsUpdatingQuestionOpen(false)}
          question={selectedQuestion}
        />
      )}
      <GenerateQuestionsDialog
        isOpen={isGeneratingQuestionsOpen}
        handleClose={() => setIsGeneratingQuestionsOpen(false)}
      />
    </Box>
  );
};

export default QuestionsTable;
