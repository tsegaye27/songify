import React, { Suspense } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { AppLayout, Loader } from "./ui";
import RootState from "./redux/RootState";
import GlobalStyles from "./styles/GlobalStyles";
import { routes } from "./router";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <AppLayout />;
};

const PublicRoute: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={<Loader isFullScreen />}>
      <Outlet />
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <PublicRoute />,
    children: routes
      .filter((route) => !route.isAuthenticated)
      .map((route) => ({
        path: route.path.replace("/auth/", ""),
        element: (
          <Suspense fallback={<Loader isFullScreen />}>
            {route.element}
          </Suspense>
        ),
      })),
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: routes
      .filter((route) => route.isAuthenticated)
      .map((route) => ({
        index: route.path === "/",
        path: route.path === "/" ? undefined : route.path.substring(1),
        element: (
          <Suspense fallback={<Loader isFullScreen />}>
            {route.element}
          </Suspense>
        ),
      })),
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

const App: React.FC = () => {
  const appLoading = useSelector((state: RootState) => state.auth.appLoading);

  if (appLoading) {
    return <Loader message="Loading..." isFullScreen />;
  }

  return (
    <>
      <GlobalStyles />
      <Toaster
        position="top-center"
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: "var(--background-color)",
            color: "var(--text-color)",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "var(--green-primary)",
              secondary: "var(--background-color)",
            },
          },
          error: {
            iconTheme: {
              primary: "var(--red-primary)",
              secondary: "var(--background-color)",
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
