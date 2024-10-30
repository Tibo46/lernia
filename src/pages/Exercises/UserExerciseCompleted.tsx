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
  console.log(totalScore);
  return (
    <Stack
      height="100%"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <>
        <Typography variant="h2">Exercise completed!</Typography>
        {userExercise && (
          <div style={{ position: "relative" }}>
            {totalScore > 0.7 && (
              <div className="pyro">
                <div className="before"></div>
                <div className="after"></div>
              </div>
            )}
            <div>
              <Typography variant="h3">Exercise details</Typography>
              <Typography>
                Score:
                {userExercise.questions.filter((x) => x.isCorrect).length}/
                {userExercise.questions.length}
              </Typography>
              <Typography>
                Correct answers:{" "}
                {userExercise.questions.filter((x) => x.isCorrect).length}
              </Typography>
              <Typography>
                Incorrect answers:{" "}
                {userExercise.questions.filter((x) => !x.isCorrect).length}
              </Typography>
            </div>
          </div>
        )}
        <Button variant="contained" onClick={handleStartNewExercise}>
          Start a new one
        </Button>
      </>
    </Stack>
  );
};

export default UserExerciseCompleted;
