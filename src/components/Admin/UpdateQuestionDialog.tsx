import React, { useState } from "react";
import { updateQuestion } from "../../services/questions";
import { QuestionModel } from "../../models/ExercisesModels";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const UpdateQuestionDialog: React.FC<{
  isOpen: boolean;
  handleClose: () => void;
  question: QuestionModel;
}> = ({ isOpen, handleClose, question }) => {
  const [questionText, setQuestionText] = useState(question.questionText);
  const [helperText, setHelperText] = useState(question.helperText);
  const [correctAnswer, setCorrectAnswer] = useState(question.questionText);
  const [explanation, setExplanation] = useState(question.explanation);
  const [word, setWord] = useState(question.word);

  const handleUpdateQuestion = async () => {
    const response = await updateQuestion({
      ...question,
      questionText,
      helperText,
      correctAnswer,
      word,
      explanation,
    });
    // TODO
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Update question</DialogTitle>
      <DialogContent>
        <TextField
          label="Question"
          multiline={true}
          fullWidth={true}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
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
        <TextField
          label="Helper text"
          fullWidth={true}
          value={helperText}
          onChange={(e) => setHelperText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleUpdateQuestion}>Generate</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateQuestionDialog;
