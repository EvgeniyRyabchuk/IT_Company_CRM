import AuthGuard from '../auth/AuthGuard';
import chartsRoute from '../pages/charts/ChartsRoute';
import dashboardRoutes from '../pages/dashboard/DashboardRoutes';
import materialRoutes from '../pages/material-kit/MaterialRoutes';
import NotFound from '../pages/sessions/NotFound';
import sessionRoutes from '../pages/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from '../components/MatxLayout/MatxLayout';
import RoleGuard from "../auth/RoleGuard";

const getChildRoutesWithRoleContext = () => {
  const children = [ ...dashboardRoutes, ...chartsRoute, ...materialRoutes ];
  children.map((e) => {
    return e.element = (<RoleGuard allowRoles={e.allowForRole}>{e.element}</RoleGuard>)
  })
  console.log('children', children);
  return children;
}

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: getChildRoutesWithRoleContext(),
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
