import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./Analytics')));

const dashboardRoutes = [
  {
    path: '/dashboard/default',
    element: <Analytics />,
    allowForRole: authRoles.all
  },
];

export default dashboardRoutes;
