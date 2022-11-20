import Loadable from '../../../components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../../auth/authRoles';


const CustomerListPage = Loadable(lazy(() => import('./CustomerListPage')));

const customerRoutes = [
    {
        path: '/customers',
        element: <CustomerListPage />,
        allowForRole: authRoles.all
    },
];

export default customerRoutes;
