import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { deleteQuestion } from "../../services/questions";
import { QuestionModel } from "../../models/ExercisesModels";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";

const DeleteQuestionDialog: React.FC<{
  handleClose: () => void;
  question: QuestionModel;
}> = ({ handleClose, question }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDeleteQuestion = async () => {
    if (!question?.id) return;

    await deleteQuestion(question.id);
    //TODO: handle error + handle success
    handleClose();
  };

  return (
    <>
      <GridActionsCellItem
        icon={<Delete />}
        label="Delete"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <Dialog open={isOpen} fullWidth={true} maxWidth="sm">
        <DialogTitle>
          Are you sure you want to delete this question?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">"{question.questionText}"</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleDeleteQuestion}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteQuestionDialog;
