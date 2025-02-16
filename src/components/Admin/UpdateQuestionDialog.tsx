import React, { useState } from "react";
import { updateQuestion } from "../../services/questions";
import { QuestionModel } from "../../models/ExercisesModels";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Edit } from "@mui/icons-material";

const UpdateQuestionDialog: React.FC<{
  handleClose: () => void;
  question: QuestionModel;
}> = ({ handleClose, question }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [questionText, setQuestionText] = useState(question.questionText);
  const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswer);
  const [explanation, setExplanation] = useState(question.explanation);
  const [word, setWord] = useState(question.word);

  const handleUpdateQuestion = async () => {
    if (
      !question.id ||
      !questionText ||
      !correctAnswer ||
      !word ||
      !explanation
    )
      return;
    console.log(question);
    const response = await updateQuestion({
      ...question,
      questionText,
      correctAnswer,
      word,
      explanation,
    });
    //TODO: handle error + handle success
    console.log(response);
    resetFormAndClose();
  };

  const resetFormAndClose = () => {
    setQuestionText(question.questionText);
    setCorrectAnswer(question.correctAnswer);
    setWord(question.word);
    setExplanation(question.explanation);
    setIsOpen(false);
    handleClose();
  };

  if (!question) return null;

  return (
    <>
      <GridActionsCellItem
        icon={<Edit />}
        label="Edit"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <Dialog open={isOpen} fullWidth={true} maxWidth="sm">
        <DialogTitle>Update question</DialogTitle>
        <DialogContent>
          <Stack spacing={2} pt={1}>
            <TextField
              label="Question"
              multiline={true}
              rows={4}
              maxRows={4}
              fullWidth={true}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              error={!questionText.includes("{{answer}}")}
              helperText={
                !questionText.includes("{{answer}}")
                  ? "Question must contain {{answer}} placeholder"
                  : ""
              }
            />
            <TextField
              label="Word"
              fullWidth={true}
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
            <TextField
              label="Correct Answer"
              fullWidth={true}
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
            <TextField
              label="Explanation"
              multiline={true}
              fullWidth={true}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
            {/* <TextField
            label="Helper text"
            fullWidth={true}
            value={helperText}
            onChange={(e) => setHelperText(e.target.value)}
          /> */}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetFormAndClose}>Close</Button>
          <Button onClick={handleUpdateQuestion} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateQuestionDialog;
