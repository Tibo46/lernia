import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { startNewExercise } from "../../services/exercises";
import { useNavigate, useParams } from "react-router-dom";
import { useUserExercise } from "../../hooks/useUserExercise";
import { Typography } from "@mui/material";
import "./fireworks.css";

const UserExerciseCompleted = () => {
  const { categoryId, exerciseId } = useParams<{
    categoryId: string;
    exerciseId: string;
  }>();
  const { userExercise } = useUserExercise(exerciseId!);
  const navigate = useNavigate();

  const handleStartNewExercise = async () => {
    const response = await startNewExercise(categoryId!);
    if (response.status === 200) {
      navigate(
        `/exercises/${categoryId}/${response.data.id}/${response.data.questions[0].id}`
      );
    }
  };

  const totalScore = userExercise
    ? userExercise.questions.filter((x) => x.isCorrect).length /
      userExercise.questions.length
    : 0;

  return (
    <Stack
      height="100%"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <>
        <Typography variant="h2">¡Ejercicio completado!</Typography>
        {userExercise && (
          <div style={{ position: "relative" }}>
            {totalScore > 0.7 && (
              <div className="pyro">
                <div className="before"></div>
                <div className="after"></div>
              </div>
            )}
            <div>
              <Typography variant="h3">Detalles del ejercicio</Typography>
              <Typography>
                Puntuación:
                {userExercise.questions.filter((x) => x.isCorrect).length}/
                {userExercise.questions.length}
              </Typography>
              <Typography>
                Respuestas correctas:{" "}
                {userExercise.questions.filter((x) => x.isCorrect).length}
              </Typography>
              <Typography>
                Respuestas incorrectas:{" "}
                {userExercise.questions.filter((x) => !x.isCorrect).length}
              </Typography>
            </div>
          </div>
        )}
        <Button variant="contained" onClick={handleStartNewExercise}>
          Empezar uno nuevo
        </Button>
      </>
    </Stack>
  );
};

export default UserExerciseCompleted;
