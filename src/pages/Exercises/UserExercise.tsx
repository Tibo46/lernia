import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { validateAnswer } from "../../services/exercises";
import { useUserExercise } from "../../hooks/useUserExercise";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { colors } from "../../constants";
import { UserExerciseQuestionModel } from "../../models/ExercisesModels";
import UserExerciseCompleted from "./UserExerciseCompleted";

const UserExercise: React.FC = () => {
  const { categoryId, exerciseId, questionId } = useParams<{
    categoryId: string;
    exerciseId: string;
    questionId?: string;
  }>();
  const navigate = useNavigate();
  const { userExercise, isLoading: isUserExerciseLoading } = useUserExercise(
    exerciseId!
  );

  const [currentQuestion, setCurrentQuestion] =
    useState<UserExerciseQuestionModel | null>(
      questionId && userExercise
        ? userExercise.questions.find((x) => x.id == questionId) ??
            userExercise?.questions[0]
        : null
    );
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [explanations, setExplanations] = useState<string | null>(null);
  const [numberOfAnsweredQuestions, setNumberOfAnsweredQuestions] =
    useState<number>(0);

  useEffect(() => {
    if (userExercise && !isUserExerciseLoading) {
      setLoading(false);
      setNumberOfAnsweredQuestions(
        userExercise.questions.filter(
          (question) => question.userPreviousAnswer !== null
        ).length + 1
      );
      const questId =
        questionId ??
        userExercise.questions.find((x) => x.userPreviousAnswer === null)?.id ??
        null;
      const question =
        questId && userExercise
          ? userExercise.questions.find((x) => x.id == questionId) ??
            userExercise?.questions[0]
          : null;
      setCurrentQuestion(question);
      setIsCorrect(question?.isCorrect ?? null);
      setExplanations(question?.explanation ?? null);
      setCorrectAnswer(question?.correctAnswer ?? null);
      setUserAnswer(question?.userPreviousAnswer ?? "");
    }
  }, [userExercise, isUserExerciseLoading, questionId]);

  const moveToNextQuestion = useCallback(() => {
    if (!currentQuestion || !userExercise) return;
    userExercise.questions.find(
      (x) => x.id === currentQuestion.id
    )!.userPreviousAnswer = userAnswer;

    const nextQuestion = userExercise.questions.find(
      (x) => x.userPreviousAnswer === null && x.id !== currentQuestion.id
    );

    if (nextQuestion) {
      navigate(`/exercises/${categoryId}/${exerciseId}/${nextQuestion.id}`);
      setIsCorrect(nextQuestion.isCorrect ?? null);
      setExplanations(nextQuestion.explanation ?? null);
      setCorrectAnswer(nextQuestion.correctAnswer ?? null);
      setUserAnswer(nextQuestion.userPreviousAnswer ?? "");
      setNumberOfAnsweredQuestions((prev) => prev + 1);
    } else {
      navigate(`/exercises/${categoryId}/${exerciseId}/completed`);
    }
  }, [
    categoryId,
    currentQuestion,
    exerciseId,
    navigate,
    userAnswer,
    userExercise,
  ]);

  useEffect(() => {
    if (!questionId || !userExercise) return;
    const question = userExercise.questions.find((x) => x.id === questionId);
    if (question) {
      if (question.userPreviousAnswer !== null) {
        moveToNextQuestion();
      }
      setCurrentQuestion(question);
    }
  }, [moveToNextQuestion, questionId, userExercise]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userExercise || !currentQuestion) return;

    try {
      setLoading(true);
      const response = await validateAnswer(
        userExercise.id,
        currentQuestion.id,
        userAnswer
      );

      setIsCorrect(response.data.isCorrect);
      setExplanations(response.data.explanation);
      setCorrectAnswer(response.data.correctAnswer);
      setUserAnswer(response.data.userAnswer);
    } catch (error) {
      console.error("Error submitting answer", error);
    } finally {
      setLoading(false);
      setUserAnswer("");
    }
  };

  if (!userExercise) {
    return <Typography>No exercise found.</Typography>;
  }
  console.log("numberOfAnsweredQuestions", numberOfAnsweredQuestions);
  console.log("userExercise.questions.length", userExercise.questions.length);
  if (!currentQuestion) {
    return <UserExerciseCompleted />;
  }

  const splittedQuestion = currentQuestion?.questionText.split("{{answer}}");

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6">
        Question {numberOfAnsweredQuestions} / {userExercise.questions.length}
      </Typography>

      {currentQuestion.type === "fill-in-the-gap" && (
        <>
          <Stack spacing={2} alignItems="center">
            <Stack spacing={2}>
              <Typography>{currentQuestion.helperText}</Typography>
              <Typography
                component="div"
                sx={{
                  display: "inline",
                  fontSize: "1.5rem",
                }}
              >
                {splittedQuestion[0]}
                <div style={{ position: "relative", display: "inline" }}>
                  <TextField
                    value={
                      isCorrect !== null
                        ? currentQuestion.userPreviousAnswer !== ""
                          ? currentQuestion.userPreviousAnswer
                          : userAnswer
                        : userAnswer
                    }
                    onChange={(e) => setUserAnswer(e.target.value)}
                    size="small"
                    sx={{
                      marginLeft: 1,
                      marginRight: 1,
                      "& input": {
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: 600,
                        ...(isCorrect !== null && {
                          WebkitTextFillColor: isCorrect
                            ? `${colors.valid}!important`
                            : `${colors.invalid}!important`,
                          color: isCorrect
                            ? `${colors.valid}!important`
                            : `${colors.invalid}!important`,
                        }),
                      },

                      ...(isCorrect !== null && {
                        "& fieldset": {
                          borderColor: isCorrect
                            ? `${colors.valid}!important`
                            : `${colors.invalid}!important`,
                        },
                      }),
                    }}
                    disabled={isCorrect !== null}
                  />
                  <span style={{ fontStyle: "italic", fontWeight: 900 }}>
                    ({currentQuestion.word})
                  </span>
                </div>
                {splittedQuestion[1]}
              </Typography>
              {isCorrect === false && (
                <Typography
                  sx={{
                    color: isCorrect ? colors.valid : colors.invalid,
                    fontWeight: "bold",
                    width: "100%",
                  }}
                >
                  {isCorrect ? "Correcto" : "Incorrecto"} - Correct answer:{" "}
                  {correctAnswer}
                </Typography>
              )}
              {isCorrect !== null && (
                <Typography color={isCorrect ? "success" : "error"}>
                  {explanations}
                </Typography>
              )}
            </Stack>
          </Stack>
        </>
      )}

      {isCorrect === null ? (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={userAnswer === "" || loading}
          sx={{ mt: 2 }}
        >
          Submit Answer
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={moveToNextQuestion}
          sx={{ mt: 2 }}
        >
          {numberOfAnsweredQuestions === userExercise.questions.length ? (
            <>Finish</>
          ) : (
            <>Next Question</>
          )}
        </Button>
      )}
    </form>
  );
};

export default UserExercise;