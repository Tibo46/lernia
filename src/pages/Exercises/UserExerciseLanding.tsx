import { useNavigate, useParams } from "react-router-dom";
import { useInProgressUserExercise } from "../../hooks/useInProgressUserExercise";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { startNewExercise } from "../../services/exercises";
import { usePastUserExercises } from "../../hooks/usePastUserExercises";
import { Card, CardContent, Grid2 } from "@mui/material";
import { UserExerciseInProgressModel } from "../../models/ExercisesModels";
import { useCategory } from "../../hooks/useCategory";
import FullPageLoading from "../../components/Loading/FullPageLoading";

const UserExerciseLanding = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { inProgressExercise, isLoading } = useInProgressUserExercise(
    categoryId!
  );
  const { category } = useCategory(categoryId!);
  const { pastExercises, isLoading: isLoadingPastExercises } =
    usePastUserExercises(categoryId!);

  const handleStartNewExercise = async () => {
    const response = await startNewExercise(categoryId!);
    if (response.status === 200) {
      navigate(
        `/exercises/${categoryId}/${response.data.id}/${response.data.questions[0].id}`
      );
    }
  };

  if (isLoading || isLoadingPastExercises) {
    return <FullPageLoading />;
  }

  return (
    <Stack
      height="100%"
      sx={{
        paddingTop: {
          xs: "55px",
          sm: "55px",
          md: "0",
        },
      }}
      spacing={2}
      justifyContent="start"
      alignItems={!inProgressExercise ? "center" : "start"}
    >
      <Typography variant="h2">{category?.name} exercises</Typography>
      {!inProgressExercise ? (
        <>
          <Typography>No in progress exercise found</Typography>
          <Button variant="contained" onClick={handleStartNewExercise}>
            Start a new exercise
          </Button>
        </>
      ) : (
        <>
          <ExerciseCard exercise={inProgressExercise} />
        </>
      )}
      {pastExercises && pastExercises.length > 0 && (
        <Grid2 container={true} spacing={2} width="100%">
          <Grid2 size={12}>
            <Typography>Previous exercises</Typography>
          </Grid2>
          {pastExercises.map((exercise) => (
            <ExerciseCard exercise={exercise} key={exercise.id} />
          ))}
        </Grid2>
      )}
    </Stack>
  );
};

const ExerciseCard: React.FC<{ exercise: UserExerciseInProgressModel }> = ({
  exercise,
}) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const handleContinueExercise = async () => {
    navigate(`/exercises/${categoryId}/${exercise.id}/`);
  };
  return (
    <Grid2
      size={{
        xs: 12,
        sm: 6,
        md: 4,
        xl: 3,
      }}
      component={Card}
    >
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h3">
            {exercise.isCompleted ? (
              <>Exercise results:</>
            ) : (
              <>Exercise in progress:</>
            )}
          </Typography>
          <Stack spacing={0}>
            {exercise.isCompleted ? (
              <>
                <Typography>
                  Score:
                  {exercise.totalCorrectAnswers}/{exercise.totalQuestions}
                </Typography>
                <Typography>
                  Correct answers: {exercise.totalCorrectAnswers}
                </Typography>
                <Typography>
                  Incorrect answers: {exercise.totalIncorrectAnswers}
                </Typography>
              </>
            ) : (
              <Typography>
                Questions answered: {exercise.totalAnsweredQuestions}/
                {exercise.totalQuestions}
              </Typography>
            )}
          </Stack>
          <Typography variant="caption" textAlign="right" display="block">
            {Intl.DateTimeFormat("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(exercise.startDate))}
          </Typography>
          {!exercise.isCompleted && (
            <Button variant="contained" onClick={handleContinueExercise}>
              Continue exercise
            </Button>
          )}
        </Stack>
      </CardContent>
    </Grid2>
  );
};

export default UserExerciseLanding;
