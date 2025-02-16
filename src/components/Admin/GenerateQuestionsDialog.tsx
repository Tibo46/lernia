import React, { useState } from "react";
import { generateQuestions } from "../../services/questions";
import { useCategories } from "../../hooks/useCategories";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import LoadingCat from "../Loading/LoadingCat";

const GenerateQuestionsDialog: React.FC<{
  isOpen: boolean;
  handleClose: () => void;
}> = ({ isOpen, handleClose }) => {
  const { categories } = useCategories();
  const [categoryId, setCategoryId] = useState(categories?.[0]?.id ?? "");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [aiContext, setAiContext] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await generateQuestions(
        categoryId,
        numberOfQuestions,
        aiContext
      );
      console.log(response);
      //TODO: handle error + handle success
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} fullWidth={true} maxWidth="sm">
      <DialogTitle>Generate questions</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <LoadingCat />
        ) : (
          <Stack direction="column" spacing={2}>
            <Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              fullWidth={true}
            >
              {categories?.map((x) => (
                <MenuItem key={x.id} value={x.id}>
                  {x.name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Number of questions"
              type="number"
              value={numberOfQuestions}
              fullWidth={true}
              onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            />
            <TextField
              label="AI context"
              multiline={true}
              rows={4}
              fullWidth={true}
              value={aiContext}
              onChange={(e) => setAiContext(e.target.value)}
            />
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
          onClick={handleGenerateQuestions}
          variant="contained"
          disabled={!categoryId || !numberOfQuestions || isLoading}
        >
          Generate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenerateQuestionsDialog;
