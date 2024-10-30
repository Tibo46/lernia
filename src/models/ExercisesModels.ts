export interface UserExerciseInProgressModel {
  id: string;
  categoryId: string;
  totalQuestions: number;
  totalAnsweredQuestions: number;
  totalCorrectAnswers: number;
  totalIncorrectAnswers: number;
  startDate: Date;
  isCompleted: boolean;
}
export interface UserExerciseModel {
  id: string;
  categoryId: string;
  questions: UserExerciseQuestionModel[];
}

export interface UserExerciseQuestionModel {
  id: string;
  userPreviousAnswer: string | null;
  isCorrect: boolean | null;
  questionText: string;
  helperText: string;
  type: string;
  word: string;
  explanation: string | null;
  correctAnswer: string | null;
}

export interface RepliedQuestionModel {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
}

export interface AnswerModel {
  userExerciseId: string;
  questionId: string;
  explanation: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}
