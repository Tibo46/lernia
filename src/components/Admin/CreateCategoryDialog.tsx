import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import LoadingCat from "../Loading/LoadingCat";
import { TextField, Button } from "@mui/material";
import { createCategory } from "../../services/categories";

const CreateCategoryDialog = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [needsWords, setNeedsWords] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateCategory = async () => {
    setIsLoading(true);
    try {
      const response = await createCategory({
        id: crypto.randomUUID(),
        name,
        description,
        color,
        needsWords,
        numberOfExercises: 0,
      });

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
            <TextField
              label="Name"
              value={name}
              fullWidth={true}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Description"
              multiline={true}
              rows={4}
              maxRows={4}
              fullWidth={true}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              label="Color"
              value={color}
              fullWidth={true}
              onChange={(e) => setColor(e.target.value)}
            />
            <Stack direction="row" alignItems="center">
              <Checkbox
                checked={needsWords}
                onChange={(e) => setNeedsWords(e.target.checked)}
              />
              <Typography variant="body1">
                This category needs the "word" field to be generated. Leave this
                unticked to not have the word between parathesis in the
                questions
              </Typography>
            </Stack>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
          onClick={handleCreateCategory}
          variant="contained"
          disabled={!name || !description || !color || isLoading}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCategoryDialog;
