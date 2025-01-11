import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { protectedRoutes, publicRoutes } from "../configs/routesConfig";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import AppRoute from "./AppRoute";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<ProtectedRoute />}>
        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AppRoute
                routeKey={route.key}
                component={route.component}
                {...route.meta}
              />
            }
          />
        ))}
      </Route>

      <Route path="/" element={<PublicRoute />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AppRoute
                routeKey={route.key}
                component={route.component}
                {...route.meta}
              />
            }
          />
        ))}
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  );
};

export default Routes;
