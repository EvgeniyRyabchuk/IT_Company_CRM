import Loadable from '../../../components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../../auth/authRoles';


const EmployeeListPage = Loadable(lazy(() => import('./EmployeeListPage')));

const employeeRoutes = [
    {
        path: '/employees',
        // render: (props) => <Analytics auth={authRoles.employee} {...props} />,
        element: <EmployeeListPage />,
        allowForRole: authRoles.all
        // auth: authRoles.employee
        // component: (props) => <Analytics auth={authRoles.employee} {...props} />
        // element: (props) => <Analytics allowForRoles={authRoles.employee} {...props}/>,
    },
];

export default employeeRoutes;
