import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AppProvider, useAppContext } from "./context/AppContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { BrandLogo } from "./components/layout/BrandLogo.jsx";

const AppLayout = lazy(() => import("./layouts/AppLayout.jsx").then((module) => ({ default: module.AppLayout })));
const LandingPage = lazy(() => import("./pages/LandingPage.jsx").then((module) => ({ default: module.LandingPage })));
const AuthPage = lazy(() => import("./pages/AuthPage.jsx").then((module) => ({ default: module.AuthPage })));
const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx").then((module) => ({ default: module.DashboardPage })));
const AssistantPage = lazy(() => import("./pages/AssistantPage.jsx").then((module) => ({ default: module.AssistantPage })));
const TrackerPage = lazy(() => import("./pages/TrackerPage.jsx").then((module) => ({ default: module.TrackerPage })));
const VaultPage = lazy(() => import("./pages/VaultPage.jsx").then((module) => ({ default: module.VaultPage })));
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx").then((module) => ({ default: module.ProfilePage })));

function ProtectedLayout() {
  const { appState } = useAppContext();
  if (!appState.user) {
    return <Navigate to="/auth" replace />;
  }

  return <AppLayout />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,var(--bg),var(--bg-alt))] px-6">
                <div className="glass-panel flex items-center gap-4 px-6 py-5 text-sm text-slate-200">
                  <BrandLogo size="sm" />
                  <span>Loading Broom...</span>
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/app" element={<ProtectedLayout />}>
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="assistant" element={<AssistantPage />} />
                <Route path="tracker" element={<TrackerPage />} />
                <Route path="vault" element={<VaultPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}
