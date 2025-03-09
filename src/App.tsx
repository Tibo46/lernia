import { lazy, Suspense } from "react";
import { MUI } from "./MUI";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Authentication from "./pages/Authentication/Authentication";
import FullPageLoading from "./components/Loading/FullPageLoading";
import AdminCategories from "./pages/Admin/AdminCategories";
import { PageProvider } from "./contexts/PageContext";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const ExerciseCategories = lazy(
  () => import("./pages/Exercises/ExerciseCategories")
);
const UserExercise = lazy(() => import("./pages/Exercises/UserExercise"));
const UserExerciseLanding = lazy(
  () => import("./pages/Exercises/UserExerciseLanding")
);
const UserExerciseCompleted = lazy(
  () => import("./pages/Exercises/UserExerciseCompleted")
);
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const AdminQuestions = lazy(() => import("./pages/Admin/AdminQuestions"));

function App() {
  return (
    <MUI>
      <BrowserRouter>
        <PageProvider>
          <Authentication>
            <Suspense fallback={<FullPageLoading />}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="exercises" element={<ExerciseCategories />} />
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
                  <Route path="admin" element={<AdminDashboard />} />
                  <Route path="admin/questions" element={<AdminQuestions />} />
                  <Route
                    path="admin/categories"
                    element={<AdminCategories />}
                  />
                  <Route path="*" element={<Dashboard />} />
                </Route>
              </Routes>
            </Suspense>
          </Authentication>
        </PageProvider>
      </BrowserRouter>
    </MUI>
  );
}

export default App;
