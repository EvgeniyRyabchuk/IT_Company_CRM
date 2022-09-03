import AuthGuard from '../auth/AuthGuard';

import dashboardRoutes from '../pages/dashboard/DashboardRoutes';
import materialRoutes from '../pages/material-kit/MaterialRoutes';
import NotFound from '../pages/sessions/NotFound';
import sessionRoutes from '../pages/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from '../components/MatxLayout/MatxLayout';
import RoleGuard from "../auth/RoleGuard";
import chatRoutes from "../pages/chat/ChatRoutes";
import projectRoutes from "../pages/projects/ProjectsRoutes";
import eventCalendarRoutes from "../pages/eventCalendar/EventCalendarRoutes";
import employeeRoutes from "../pages/users/employees/employeeRoutes";
import statisticRoute from "../pages/statistic/StatisticRoute";
import customerRoutes from "../pages/users/customers/CustomerRoutes";
import ordersRoutes from "../pages/orders/OrdersRoutes";

const children = [
  ...dashboardRoutes,
  ...statisticRoute,
  ...materialRoutes,
  ...chatRoutes,
  ...projectRoutes,
  ...eventCalendarRoutes,
  ...employeeRoutes,
  ...customerRoutes,
  ...ordersRoutes
];

const getChildRoutesWithRoleContext = () => {

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
