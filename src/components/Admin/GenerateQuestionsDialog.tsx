import React, { useState } from "react";
import { generateQuestions, updateQuestion } from "../../services/questions";
import { QuestionModel } from "../../models/ExercisesModels";
import { useCategories } from "../../hooks/useCategories";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";

const GenerateQuestionsDialog: React.FC<{
  isOpen: boolean;
  handleClose: () => void;
}> = ({ isOpen, handleClose }) => {
  const { categories } = useCategories();
  const [categoryId, setCategoryId] = useState("");

  const handleGenerateQuestions = async () => {
    const response = await generateQuestions(categoryId);
    console.log(response);
    // TODO
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Generate questions</DialogTitle>
      <DialogContent>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categories?.map((x) => (
            <MenuItem key={x.id} value={x.id}>
              {x.name}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleGenerateQuestions}>Generate</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenerateQuestionsDialog;
