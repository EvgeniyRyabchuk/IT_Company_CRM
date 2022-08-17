import AuthGuard from '../auth/AuthGuard';
import chartsRoute from '../pages/charts/ChartsRoute';
import dashboardRoutes from '../pages/dashboard/DashboardRoutes';
import materialRoutes from '../pages/material-kit/MaterialRoutes';
import NotFound from '../pages/sessions/NotFound';
import sessionRoutes from '../pages/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from '../components/MatxLayout/MatxLayout';

const routes = [
  {
    element: (
      <AuthGuard>
        123
        <MatxLayout />

      </AuthGuard>
    ),
    children: [...dashboardRoutes, ...chartsRoute, ...materialRoutes],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
