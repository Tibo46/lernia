import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  DialogActions,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { useState } from "react";
import { reportQuestion } from "../../services/questions";
import ReportFlag from "../../assets/icons/ReportFlag";

const ReportQuestion: React.FC<{ questionId: string }> = ({ questionId }) => {
  const [confirmReport, setConfirmReport] = useState<boolean>(false);
  const [isReported, setIsReported] = useState<boolean>(false);
  const [isReportLoading, setIsReportLoading] = useState<boolean>(false);

  const handleReport = async () => {
    setIsReportLoading(true);
    await reportQuestion(questionId);
    setIsReported(true);
    setIsReportLoading(false);
    setConfirmReport(false);
  };

  return (
    <>
      <Tooltip title={isReported ? "Reportado" : "Reportar pregunta"}>
        <Box
          sx={{ position: "absolute", top: "10px", right: "10px", zIndex: 9 }}
        >
          <IconButton
            sx={{
              width: "45px",
              height: "45px",
            }}
            disabled={isReportLoading || isReported}
            onClick={() => setConfirmReport(true)}
          >
            <ReportFlag
              height="22px"
              width="22px"
              color={isReported ? "red" : "#5b5860"}
            />
          </IconButton>
        </Box>
      </Tooltip>
      <Dialog open={confirmReport} onClose={() => setConfirmReport(false)}>
        <DialogTitle>¿Quieres reportar esta pregunta?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Puedes reportar esta pregunta si crees que está mal o no está
            relacionada con el tema.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmReport(false)}>Cancelar</Button>
          <Button
            onClick={() => {
              handleReport();
            }}
            autoFocus
            variant="contained"
            disabled={isReportLoading}
          >
            Reportar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReportQuestion;
