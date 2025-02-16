import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CategoryModel } from "../../models/CategoriesModels";
import { updateCategory } from "../../services/categories";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Edit } from "@mui/icons-material";

const UpdateCategoryDialog: React.FC<{
  handleClose: () => void;
  category: CategoryModel;
}> = ({ handleClose, category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(category.name);
  const [color, setColor] = useState(category.color);
  const [description, setDescription] = useState(category.description);
  const [needsWords, setNeedsWords] = useState(category.needsWords);

  const handleUpdateCategory = async () => {
    if (!category.id || !name || !color) return;

    const response = await updateCategory({
      ...category,
      name,
      color,
      description,
      needsWords,
    });

    //TODO: handle error + handle success
    console.log(response);

    resetFormAndClose();
  };

  const resetFormAndClose = () => {
    setName(category.name);
    setColor(category.color);
    setDescription(category.description);
    setNeedsWords(category.needsWords);
    setIsOpen(false);
    handleClose();
  };

  if (!category) return null;

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
              fullWidth={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!name}
              helperText={!name ? "Name is required" : ""}
            />
            <TextField
              label="Color"
              fullWidth={true}
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <TextField
              label="Description"
              rows={4}
              maxRows={4}
              multiline={true}
              fullWidth={true}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={resetFormAndClose}>Close</Button>
          <Button onClick={handleUpdateCategory} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateCategoryDialog;
