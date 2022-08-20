import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';


const LargeEventCalendar = Loadable(lazy(() => import('./EventCalendarPage')));

const eventCalendarRoutes = [
    {
        path: '/events',
        // render: (props) => <Analytics auth={authRoles.employee} {...props} />,
        element: <LargeEventCalendar />,
        allowForRole: authRoles.all
        // auth: authRoles.employee
        // component: (props) => <Analytics auth={authRoles.employee} {...props} />
        // element: (props) => <Analytics allowForRoles={authRoles.employee} {...props}/>,
    },
];

export default eventCalendarRoutes;
