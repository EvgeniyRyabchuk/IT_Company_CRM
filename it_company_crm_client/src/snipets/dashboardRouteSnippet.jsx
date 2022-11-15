import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./Analytics')));

const dashboardRoutes = [
    {
        path: '/dashboard/default',
        // render: (props) => <Analytics auth={authRoles.employee} {...props} />,
        element: <Analytics />,
        allowForRole: authRoles.all
        // auth: authRoles.employee
        // component: (props) => <Analytics auth={authRoles.employee} {...props} />
        // element: (props) => <Analytics allowForRoles={authRoles.employee} {...props}/>,
    },
];

export default dashboardRoutes;
