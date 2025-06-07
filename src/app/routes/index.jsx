import { Routes, Route } from "react-router-dom";
import { HomePage } from "@pages/HomePage";
import { ToDosPage } from "@pages/ToDosPage";
import { CalendarPage } from "@pages/CalendarPage";
import { NotesPage } from "@pages/NotesPage";
import { ProductivityPage } from "@pages/ProductivityPage";
import { StrategiesPage } from "@pages/StrategiesPage";
import { LibraryPage } from "@pages/LibraryPage";
import { TestsPage } from "@pages/TestsPage";
import { ThreadsPage } from "@pages/ThreadsPage";
import { BudgetPage } from "@pages/BudgetPage";
import ProtectedRoute from "@routes/ProtectedRoute.jsx";
import AuthPage from "@pages/AuthPage/index.jsx";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<AuthPage />} />
      <Route path="/auth/register" element={<AuthPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/todos"
        element={
          <ProtectedRoute>
            <ToDosPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/productivity"
        element={
          <ProtectedRoute>
            <ProductivityPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/strategies"
        element={
          <ProtectedRoute>
            <StrategiesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/library"
        element={
          <ProtectedRoute>
            <LibraryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tests"
        element={
          <ProtectedRoute>
            <TestsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/threads"
        element={
          <ProtectedRoute>
            <ThreadsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/budget"
        element={
          <ProtectedRoute>
            <BudgetPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
