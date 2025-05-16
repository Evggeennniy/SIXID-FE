import { Routes, Route } from "react-router-dom";
import { HomePage } from "@pages/HomePage";
import { ToDosPage } from "@pages/ToDosPage";
import { NotesPage } from "@pages/NotesPage";
import { ProductivityPage } from "@pages/ProductivityPage";
import { StrategiesPage } from "@pages/StrategiesPage";
import { LibraryPage } from "@pages/LibraryPage";
import { TestsPage } from "@pages/TestsPage";
import { ThreadsPage } from "@pages/ThreadsPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/todos" element={<ToDosPage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/productivity" element={<ProductivityPage />} />
      <Route path="/strategies" element={<StrategiesPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/tests" element={<TestsPage />} />
      <Route path="/threads" element={<ThreadsPage />} />
    </Routes>
  );
};
