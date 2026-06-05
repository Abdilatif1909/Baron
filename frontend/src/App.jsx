import { Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/layout/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import AboutPage from './pages/AboutPage';
import BooksPage from './pages/BooksPage';
import ContactPage from './pages/ContactPage';
import CoursesPage from './pages/CoursesPage';
import HomePage from './pages/HomePage';
import LecturesPage from './pages/LecturesPage';
import LoginPage from './pages/LoginPage';
import PracticalsPage from './pages/PracticalsPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import TeacherPanelPage from './pages/TeacherPanelPage';
import TeacherTestsPage from './pages/TeacherTestsPage';
import TestResultPage from './pages/TestResultPage';
import TestSessionPage from './pages/TestSessionPage';
import TestsPage from './pages/TestsPage';
import VideosPage from './pages/VideosPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import SpaRedirectHandler from './components/SpaRedirectHandler';

function App() {
  return (
    <>
      <SpaRedirectHandler />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/lectures" element={<LecturesPage />} />
          <Route path="/practicals" element={<PracticalsPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/teacher"
            element={(
              <ProtectedRoute>
                <TeacherPanelPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/dashboard"
            element={(
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/teacher/tests"
            element={(
              <ProtectedRoute>
                <TeacherTestsPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/tests/session/:testId"
            element={(
              <ProtectedRoute>
                <TestSessionPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/tests/result/:resultId"
            element={(
              <ProtectedRoute>
                <TestResultPage />
              </ProtectedRoute>
            )}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
