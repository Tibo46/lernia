import { lazy, Suspense } from "react";
import { MUI } from "./MUI";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoadingPage from "./components/Loading/LoadingPage";
import Layout from "./components/Layout/Layout";
import Authentication from "./pages/Authentication/Authentication";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const UserExercise = lazy(() => import("./pages/Exercises/UserExercise"));
const UserExerciseLanding = lazy(
  () => import("./pages/Exercises/UserExerciseLanding")
);
const UserExerciseCompleted = lazy(
  () => import("./pages/Exercises/UserExerciseCompleted")
);

function App() {
  return (
    <MUI>
      <Authentication>
        <BrowserRouter>
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route
                  path="exercises/:categoryId"
                  element={<UserExerciseLanding />}
                />
                <Route
                  path="exercises/:categoryId/:exerciseId/:questionId?"
                  element={<UserExercise />}
                />
                <Route
                  path="exercises/:categoryId/:exerciseId/completed"
                  element={<UserExerciseCompleted />}
                />
                <Route path="*" element={<Dashboard />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Authentication>
    </MUI>
  );
}

export default App;
