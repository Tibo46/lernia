import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  DialogActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import CloseIcon from "../../assets/icons/CloseIcon";

const ExitExercise = () => {
  const { categoryId } = useParams<{
    categoryId: string;
  }>();
  const navigate = useNavigate();

  const [confirmExit, setConfirmExit] = useState<boolean>(false);
  return (
    <>
      <Tooltip title="Detener ejercicio">
        <IconButton
          sx={{
            background: "#fff",
            border: "1px solid #5b5860",
            width: "45px",
            height: "45px",
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 9,
          }}
          onClick={() => setConfirmExit(true)}
        >
          <CloseIcon fontSize="22px" />
        </IconButton>
      </Tooltip>
      <Dialog open={confirmExit} onClose={() => setConfirmExit(false)}>
        <DialogTitle>¿Quieres detener este ejercicio?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Puedes detener este ejercicio en cualquier momento y retomarlo más
            tarde.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmExit(false)}>Quedarse</Button>
          <Button
            onClick={() => {
              navigate(`/exercises/${categoryId}`);
              setConfirmExit(false);
            }}
            autoFocus
            variant="contained"
          >
            Detener
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExitExercise;
